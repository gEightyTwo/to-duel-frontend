import { combineReducers } from 'redux';

import auth from './auth'
import dailies from './dailies'
import duels from './duels'

const rootReducer = combineReducers({
    dailies,
    duels,
    auth,
});

export default rootReducer;
