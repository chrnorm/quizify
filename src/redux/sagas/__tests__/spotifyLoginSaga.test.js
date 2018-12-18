import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { replace } from 'react-router-redux';
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../../reducers';
import Saga from '../spotifyLoginSaga';

import { spotifyLoginApi, stateToken } from '../../../util/spotifyLogin';

const fakeLoginUrl =
    'https://accounts.spotify.com/en/authorize?' +
    'response_type=token&client_id=00000' +
    '&scope=user-read-private%20user-read-email%20user-library-read' +
    '&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&state=8zrcuwljaf900000';

it('redirects to login url after auth request', () => {
    return expectSaga(Saga)
        .provide([
            [matchers.call.fn(spotifyLoginApi.generateLoginUrl), fakeLoginUrl]
        ])
        .call(spotifyLoginApi.redirectTo, fakeLoginUrl)
        .dispatch({ type: AUTH_REQUEST })
        .run();
});

const fakeAccessToken = 'BQAoSnm9NTE6KfFJP';
const fakeStateToken = '7sfv9usa52u00000';

// real react-router-redux event captured from redux devtools
const fakeRedirectEvent = {
    type: '@@router/LOCATION_CHANGE',
    payload: {
        pathname: '/callback',
        search: '',
        hash: `#access_token=${fakeAccessToken}&token_type=Bearer&expires_in=3600&state=${fakeStateToken}`
    }
};

it('puts a success action on redirect if the state token matches', () => {
    return expectSaga(Saga)
        .provide([[matchers.call.fn(stateToken.get), fakeStateToken]])
        .dispatch(fakeRedirectEvent)
        .put({ type: AUTH_SUCCESS, payload: fakeAccessToken })
        .run();
});

it('puts a failure action on redirect if the state token doesnt match', () => {
    return expectSaga(Saga)
        .provide([[matchers.call.fn(stateToken.get), null]])
        .dispatch(fakeRedirectEvent)
        .put({ type: AUTH_FAILURE, payload: 'auth failure' })
        .run();
});

it('redirects to /start on successful login', () => {
    return expectSaga(Saga)
        .provide([[matchers.call.fn(stateToken.get), fakeStateToken]])
        .dispatch(fakeRedirectEvent)
        .put(replace('/start'))
        .run();
});
