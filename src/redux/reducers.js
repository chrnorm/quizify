import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const initialAuthState = {
    token: null,
    error: null,
    isLoggedIn: false
};

const authReducer = (state = initialAuthState, { type, payload }) => {
    switch (type) {
        case AUTH_SUCCESS: {
            return { ...state, token: payload, isLoggedIn: true };
        }
        case AUTH_FAILURE: {
            return { ...state, error: payload };
        }
        default:
            return state;
    }
};

export const ADD_TRACKS = 'ADD_TRACKS';

const initialLibState = [];

const libraryReducer = (state = initialLibState, { type, payload }) => {
    switch (type) {
        case ADD_TRACKS: {
            return [
                ...state,
                ...payload.map(obj => {
                    return {
                        name: obj.track.name,
                        artists: obj.track.artists.map(a => a.name),
                        id: obj.track.id,
                        artwork: obj.track.album.images[1].url,
                        preview_url: obj.track.preview_url
                    };
                })
            ];
        }
        default:
            return state;
    }
};

export const QUESTION_REQUEST = 'QUESTION_REQUEST';
export const QUESTION_NEXT = 'QUESTION_NEXT';

const initialQuestionState = {
    answer: null,
    tracks: null
};

const questionReducer = (state = initialQuestionState, { type, payload }) => {
    switch (type) {
        case QUESTION_NEXT: {
            return {
                answer: payload.answer,
                tracks: payload.tracks
            };
        }
        default:
            return state;
    }
};

export const ANSWER_CORRECT = 'ANSWER_CORRECT';
export const ANSWER_INCORRECT = 'ANSWER_INCORRECT';
export const RESET_SCORE = 'RESET_SCORE';

const initialScoreState = {
    points: 0,
    answersCorrect: 0,
    gotAnAnswerWrong: false
};

const scoreReducer = (state = initialScoreState, { type, payload }) => {
    switch (type) {
        case ANSWER_CORRECT: {
            return {
                ...state,
                points: 0,
                answersCorrect: state.answersCorrect + 1
            };
        }
        case ANSWER_INCORRECT: {
            return {
                ...state,
                gotAnAnswerWrong: true
            };
        }
        case RESET_SCORE: {
            return initialScoreState;
        }
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    router: routerReducer,
    library: libraryReducer,
    question: questionReducer,
    score: scoreReducer
});
