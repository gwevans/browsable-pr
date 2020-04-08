import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';

const initialState = {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    port: "",
    protocol: "",
};

export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = createAction(SET_LOCATION, data => ({data}));

const reducer = handleActions(
    {
        [setLocation]: (state, { payload: { data } }) => ({
            ...state,
            ...data,
        })
    },
    initialState
);

export default reducer;

export const locationSelector = state => state.location;

export const pathnameSelector = createSelector(
    locationSelector,
    app => app.pathname
);

export const repoOwnerNameSelector = createSelector(
    pathnameSelector,
    pathname => pathname && pathname.length && pathname.split('/')[1]
);

export const repoNameSelector = createSelector(
    pathnameSelector,
    pathname => pathname && pathname.length && pathname.split('/')[2]
);
