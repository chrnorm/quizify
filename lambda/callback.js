const request = require('request');
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_ID;
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';

/**
 * Finds the value of a particular cookie given its key. Returns the value
 * @param {String} cookieKey the key to find the value of
 * @param {String} cookieString the string of all cookies from the request
 */
const getCookieValue = (cookieKey, cookieString) => {
    const regexp = new RegExp(`${cookieKey}=\\w+`, 'g');
    try {
        const matchingCookie = cookieString.match(regexp)[0];
        const cookieValue = matchingCookie.split('=')[1];
        return cookieValue;
    } catch (TypeError) {
        // could not find matching key or value
        return null;
    }
};

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
export function handler(event, context, callback) {
    console.log(event);

    const { code, state } = event.queryStringParameters;
    const storedState = getCookieValue(STATE_KEY, event.headers.cookie);
    if (state === null || state !== storedState) {
        callback(null, {
            statusCode: 503,
            body: "state null or didn't match cookie"
        });
    } else {
        const authUri = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString(
                        'base64'
                    )
            },
            json: true
        };

        request.post(authUri, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { Authorization: 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, (error, response, body) => {
                    console.log(body);
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify({ access_token, refresh_token })
                    });
                });
            }
        });
    }
}
