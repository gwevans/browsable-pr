import { combineReducers } from 'redux';
import locationReducer from './location';
import githubReducer from './github';

const rootReducer = combineReducers({
    locationReducer,
    githubReducer
});

export default rootReducer