import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const initialAuthState = {
    token: null,
    error: null
};

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case AUTH_SUCCESS: {
            return { ...state, token: payload };
        }
        case AUTH_FAILURE: {
            return { ...state, error: payload };
        }
        default:
            return state;
    }
};

export const ADD_TRACKS = 'ADD_TRACKS';

const initialLibState = {
    tracks: []
};

const libraryReducer = (state = initialLibState, { type, payload }) => {
    switch (type) {
        case ADD_TRACKS: {
            return {
                ...state,
                tracks: [
                    ...state.tracks,
                    ...payload.map(obj => {
                        return {
                            name: obj.track.name,
                            artist: obj.track.artists[0].name,
                            id: obj.track.id,
                            artwork: obj.track.album.images[1].url,
                            preview_url: obj.track.preview_url
                        };
                    })
                ]
            };
        }
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    router: routerReducer,
    library: libraryReducer
});
