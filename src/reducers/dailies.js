import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_DAILIES_SUCCESS,
  FETCH_DAILIES_FAIL,
  ADD_DAILY,
  REMOVE_DAILY,
  START_DUEL,
  ACCEPT_DUEL,
  CONFIRM_DUEL,
  ADD
} from '../actions/dailies'

const dailies = (state = [], action) => {
  console.log(state, action)
  switch(action.type){
    case FETCH_DAILIES_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
    dailies,
});

export default rootReducer;
