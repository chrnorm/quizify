import API_URL from './apiUrl';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';
const scope = 'user-read-private user-read-email user-library-read';

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N =>
    (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

export default {
    getLoginUrl: () => {
        const state = generateRandomString(16);

        const login_url =
            `https://accounts.spotify.com/authorize` +
            `?response_type=token` +
            `&client_id=${decodeURIComponent(CLIENT_ID)}` +
            `&scope=${decodeURIComponent(scope)}` +
            `&redirect_uri=${decodeURIComponent(REDIRECT_URI)}` +
            `&state=${decodeURIComponent(state)}`;
        return login_url;
    },

    getQuestion: async () => {
        const res = await fetch(`${API_URL}/question`, {
            credentials: 'include'
        });
        return res.json();
    },
    getAnswer: async (correct, timeRemaining) => {
        const url = new URL(`${API_URL}/answer`);
        url.search = new URLSearchParams({ correct, timeRemaining });
        const res = await fetch(url, {
            credentials: 'include'
        });
        return res.json();
    },
    getStats: async () => {
        const res = await fetch(`${API_URL}/stats`, {
            credentials: 'include'
        });
        return res.json();
    },
    reset: async () => {
        const res = await fetch(`${API_URL}/reset`, {
            credentials: 'include'
        });
        return res;
    }
};
