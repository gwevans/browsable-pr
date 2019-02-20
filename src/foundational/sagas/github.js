import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_GITHUB_INFO } from '../reducers/github';

function githubRequest(params) {
    // TODO replace pull with pulls in url
    return axios({
        method: 'get',
        url: `https://api.github.com/repos${params}`
    });
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchFiles({ payload }) {
    try {
        yield put({ type: GET_GITHUB_INFO.FETCHING });
        const { data } = yield call(githubRequest, payload);
        yield put({ type: GET_GITHUB_INFO.SUCCESS, payload: { data } });
    } catch (e) {
        yield put({ type: GET_GITHUB_INFO.ERROR, payload: { error: e.message } });
    }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* getGithubInfo() {
    yield takeEvery(GET_GITHUB_INFO.ACTION, fetchFiles);
}

export default getGithubInfo;