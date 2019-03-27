import { combineReducers } from 'redux';
import location from './location';
import github from './github';
import app from './app';

const rootReducer = combineReducers({
    location,
    github,
    app
});

export default rootReducer