import { combineReducers } from 'redux';

import auth from './auth'
import dailies from './dailies'

const rootReducer = combineReducers({
    dailies,
    auth,
});

export default rootReducer;
