'use strict';

const Spotify = require('spotify-web-api-node');
const shuffle = require('./util/shuffle');
const express = require('express');
require('dotenv').config();

const router = new express.Router();

// configure the express server
const CLIENT_ID = process.env.SPOTIFY_ID;
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
const REDIRECT_URI =
    process.env.redirect_uri || 'http://localhost:8888/callback';
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scopes = ['user-read-private', 'user-read-email', 'user-library-read'];

// configure spotify
const spotifyApi = new Spotify({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N =>
    (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/login', (_, res) => {
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get('/callback', (req, res) => {
    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
    // first do state validation
    if (state === null || state !== storedState) {
        res.redirect('/#/error/state mismatch');
        // if the state is valid, get the authorization code and pass it on to the client
    } else {
        res.clearCookie(STATE_KEY);
        // Retrieve an access token and a refresh token
        spotifyApi
            .authorizationCodeGrant(code)
            .then(data => {
                const { expires_in, access_token, refresh_token } = data.body;

                req.session.spotify_auth = { access_token, refresh_token };

                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(access_token);
                spotifyApi.setRefreshToken(refresh_token);

                spotifyApi.getMe().then(body => {
                    console.log(body);
                });

                // set up track pools in session
                // 'answer' tracks are the correct tracks that the audio will play for
                // 'filler' tracks are the other incorrect tracks that will be displayed to the user
                // trackPool is the full list of all tracks in the user's spotify library
                // trackDeck is the shuffled deck of tracks constructed from trackPool
                req.session.trackPool = {
                    answer: [],
                    filler: []
                };
                req.session.trackDeck = {
                    answer: [],
                    filler: []
                };
                req.session.lives = 3;

                // TODO: check how many tracks the user has in their library here and return an error if they have less than 50
                // also use the total number to send to getAllTracks and simplify that function

                getAllTracks(req.session);

                res.sendStatus(200);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
});

/**
 * Get the next quiz question
 */
router.get('/question', (req, res) => {
    const answer = req.session.trackDeck.answer.pop();
    const fillers = [...Array(5)];
    let filler;
    for (let i = 0; i < fillers.length; i++) {
        do {
            // pull a track from the 'fillers' deck
            filler = req.session.trackDeck.filler.pop();

            // if the track is the same as the answer, put it at the back of the 'fillers' deck
            if (filler.track.id === answer.track.id)
                req.session.trackDeck.filler.unshift(filler);
            else fillers[i] = filler;
        } while (filler.track.id === answer.track.id);
    }

    // store the answer and fillers server-side
    req.session.currentQuestion = { answer, fillers };

    const tracks = [answer, ...fillers].map(obj => ({
        name: obj.track.name,
        artists: obj.track.artists.map(artist => artist.name),
        album: obj.track.album.name,
        artwork: obj.track.album.images[0],
        id: obj.track.id
    }));
    shuffle(tracks);

    const audio = answer.track.preview_url;

    // only return the track names, artists, ids, and audio from the answer
    res.json({ tracks, audio });
});

/**
 * Get the answer to a quiz question
 * Params: selected - the id of the track that the user selected
 */
router.get('/answer', (req, res) => {
    const question = req.session.currentQuestion;

    if (!question) res.status(500).send('GET a question (/question) first');
    else if (!req.query.selected)
        res.status(500).send(
            'correct request format is /answer?selected=(id of selected track)'
        );
    else {
        let wasCorrect = '';
        if (req.query.selected === question.answer.track.id) {
            wasCorrect = true;
        } else {
            wasCorrect = false;
            req.session.lives--;
        }
        const response = {
            wasCorrect,
            lives: req.session.lives,
            correctTrackId: question.answer.track.id
        };

        console.log(response);
        res.send(response);
    }
});

/**
 * Gets the contents of the user's spotify lib
 * @param {Express.Session} session the express session object
 * @param {Number} total the total number of tracks
 * @param {Number} offset the offset (used to recursively call this function to fetch all tracks)
 */
const getAllTracks = (session, total = null, offset = 0) => {
    const limit = 50;

    // instantly start next request if we know the total number of tracks and we need to fetch more tracks
    if (total !== null && offset + limit < total)
        getAllTracks(session, total, offset + limit);
    spotifyApi.setAccessToken(session.spotify_auth.access_token);
    spotifyApi.setRefreshToken(session.spotify_auth.refresh_token);
    const trackTotal = 300;

    console.log('fetching tracks: ', offset, '/', trackTotal);
    spotifyApi.getMySavedTracks({ limit, offset }).then(({ body }) => {
        console.log(body);

        body.items.forEach(item => {
            // only append tracks with audio previews to the answers
            if (item.track.preview_url) session.trackPool.answer.push(item);
            session.trackPool.filler.push(item);
        });

        // shuffle tracks on the first and final fetch only
        if (offset === 0 || offset + limit > trackTotal) {
            session.trackDeck.answer = [].concat(session.trackPool.answer);
            session.trackDeck.filler = [].concat(session.trackPool.filler);

            shuffle(session.trackDeck.answer);
            shuffle(session.trackDeck.filler);
        }

        session.save();

        // if this was the first request and we have just found the total number of tracks, start the next request
        if (total === null && offset + limit < body.total)
            getAllTracks(session, body.total, offset + limit);
    });
};

module.exports = router;
