import { combineReducers } from 'redux';
import locationReducer from './location';

const rootReducer = combineReducers({
    locationReducer,
});

export default rootReducer