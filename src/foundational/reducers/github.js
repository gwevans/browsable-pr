import { handleActions, createAction } from 'redux-actions';
import { defineAction } from 'redux-define';
// import { createSelector } from 'reselect';

const initialState = {
    isFetching: false,
    error: null,
    data: {}
};

export const GET_GITHUB_INFO = defineAction('GET_GITHUB_INFO', ['FETCHING', 'ERROR', 'SUCCESS'], 'info');

export const getGithubInfo = createAction(GET_GITHUB_INFO.ACTION, params => params);

const reducer = handleActions({
    [GET_GITHUB_INFO.FETCHING]: state => ({
        ...state,
        isFetching: true,
    }),
    [GET_GITHUB_INFO.SUCCESS]: (state, { payload: { data } }) => {
        return {
            ...state,
            data,
            isFetching: false
        }
    },
    [GET_GITHUB_INFO.ERROR]: (state, { payload: { error } }) => ({
        ...state,
        error,
        isFetching: false
    }),
}, initialState);

export default reducer;

export const dataSelector = state => state.data;
