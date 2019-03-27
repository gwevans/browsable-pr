import { handleActions, createAction } from 'redux-actions';
import { defineAction } from 'redux-define';
// import { createSelector } from 'reselect';

const initialState = {
    activeFile: {}
};

export const SET_ACTIVE_FILE = defineAction('SET_ACTIVE_FILE');

export const setFileData = createAction(SET_ACTIVE_FILE, fileData => fileData);

const reducer = handleActions({
    [SET_ACTIVE_FILE]: (state, payload) => ({
        ...state,
        activeFile: payload.payload
    }),
}, initialState);

export default reducer;

export const activeFileSelector = state => state.app.activeFile;