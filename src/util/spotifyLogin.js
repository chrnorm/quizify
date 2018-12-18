const STATE_KEY = 'spotify_auth_state';

export const stateToken = {
    set: state => localStorage.setItem(STATE_KEY, state),
    get: () => localStorage.getItem(STATE_KEY),
    remove: () => localStorage.removeItem(STATE_KEY)
};

export const spotifyLoginApi = {
    generateLoginUrl(client_id, scope, redirect_uri, state) {
        return (
            `https://accounts.spotify.com/authorize` +
            `?response_type=token` +
            `&client_id=${decodeURIComponent(client_id)}` +
            `&scope=${decodeURIComponent(scope)}` +
            `&redirect_uri=${decodeURIComponent(redirect_uri)}` +
            `&state=${decodeURIComponent(state)}`
        );
    },
    redirectTo(newUrl) {
        window.location.assign(newUrl);
    }
};
