import { call, take, put, fork } from 'redux-saga/effects';
import { AUTH_SUCCESS, ADD_TRACKS } from '../reducers';
import SpotifyWebApi from 'spotify-web-api-js';

/**
 * Gets 50 tracks from the user's library at the specified offest and puts
 * the ADD_TRACKS action with the tracks as the payload
 * @param {SpotifyWebApi} spotifyApi preconfigured Spotify Web API object
 * @param {int} offset the offset of the items returned
 */
function* downloadTrackBatch(spotifyApi, offset) {
    const res = yield call(spotifyApi.getMySavedTracks, { limit: 50, offset });
    console.log(res);
    yield put({ type: ADD_TRACKS, payload: res.items });
}

function* trackDownloadSaga() {
    const action = yield take(AUTH_SUCCESS);
    const Spotify = new SpotifyWebApi();
    Spotify.setAccessToken(action.payload);

    const res = yield call(Spotify.getMySavedTracks);
    const totalNumTracks = res.total;

    for (let i = 0; i < totalNumTracks; i += 50) {
        yield fork(downloadTrackBatch, Spotify, i);
    }
}

export default trackDownloadSaga;
