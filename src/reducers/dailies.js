import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_DAILIES_SUCCESS,
  // FETCH_DAILIES_FAIL,
  FETCH_DAILY_COMPLETED_STATUS,
  REMOVE_DAILY,
  START_DUEL,
  ACCEPT_DUEL,
  CONFIRM_DUEL,
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

// Need to redo this reducer so that FETCH_DAILY_COMPLETED_STATUS adds a key-value pair for completed and adds it to the daily value


const dailiesCompletedStatus = (state = [], action) => {
  console.log(state, action)
  switch(action.type){
    case FETCH_DAILY_COMPLETED_STATUS:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
    dailies, dailiesCompletedStatus,
});

export default rootReducer;
