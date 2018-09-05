const querystring = require('querystring');
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';
const scope = ['user-read-private', 'user-read-email', 'user-library-read'];

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N =>
    (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
export function handler(event, context, callback) {
    console.log(event);
    const state = generateRandomString(16);

    const login_url =
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        });

    const response = {
        statusCode: 302,
        headers: {
            location: login_url,
            'Set-Cookie': `${STATE_KEY}=${state}`
        },
        body: ''
    };
    callback(null, response);
}
