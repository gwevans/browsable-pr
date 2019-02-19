import { call, put, takeLatest } from 'redux-saga/effects'
import { SET_LOCATION } from '../reducers/location';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchFiles(action) {
   try {
      const result = yield call('https://api.github.com', '/repos/octokit/rest.js/pulls');
      yield put({type: "FETCH_SUCCEEDED", location: result});
   } catch (e) {
      yield put({type: "FETCH_FAILED", message: e.message});
   }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* changeLocation() {
  yield takeLatest(SET_LOCATION, fetchFiles);
}

export default changeLocation;