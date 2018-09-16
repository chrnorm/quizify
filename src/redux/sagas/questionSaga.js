import { call, put, takeEvery, select } from 'redux-saga/effects';
import sampleSize from 'lodash.samplesize';
import * as selectors from '../selectors';
import { QUESTION_REQUEST, QUESTION_NEXT } from '../reducers';

/**
 * gets the next question by sampling 6 tracks from the tracks in the
 * store that have preview urls. Puts the result into the store.
 */
function* getNextQuestion() {
    const trackPool = yield select(selectors.getTracksWithPreview);
    const [answer, ...fillers] = yield call(sampleSize, trackPool, 6);
    const tracks = yield call(sampleSize, [answer, ...fillers], 6);
    yield put({ type: QUESTION_NEXT, payload: { answer, tracks } });
}

function* questionSaga() {
    yield takeEvery(QUESTION_REQUEST, getNextQuestion);
}

export default questionSaga;
