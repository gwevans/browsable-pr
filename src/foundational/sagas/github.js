import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_GITHUB_INFO } from '../reducers/github';

function githubRequestPullRequest(params) {
    // TODO replace pull with pulls in url
    return axios({
        method: 'get',
        url: `https://api.github.com/repos${params}`
    });
}

function githubRequestPullRequestFiles(params) {
    // TODO replace pull with pulls in url
    return axios({
        method: 'get',
        url: `https://api.github.com/repos${params}/files`
    });
}

function* fetchFiles({ payload }) {
    try {
        yield put({ type: GET_GITHUB_INFO.FETCHING });
        const { data } = yield call(githubRequestPullRequest, payload);
        const { data: files } = yield call(githubRequestPullRequestFiles, payload);
        yield put({ type: GET_GITHUB_INFO.SUCCESS, payload: { files, data } });
    } catch (e) {
        yield put({ type: GET_GITHUB_INFO.ERROR, payload: { error: e.message } });
    }
}

function* getGithubInfo() {
    yield takeEvery(GET_GITHUB_INFO.ACTION, fetchFiles);
}

export default getGithubInfo;