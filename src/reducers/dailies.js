import { combineReducers } from 'redux';
import {
  FETCH_DAILIES_SUCCESS,
  // START_DUEL,
  // ACCEPT_DUEL,
  // CONFIRM_DUEL,
} from '../actions/dailies'

const filterArchivedDailies = (action) => {
  if(action.payload) {
    const filteredDailies =  action.payload.filter((daily)=> !daily.archived)
    return filteredDailies
  }
  return action.payload
}

const dailies = (state = [], action) => {
  switch(action.type){
    case FETCH_DAILIES_SUCCESS:
      return filterArchivedDailies(action)
    default:
      return state
  }
}


const rootReducer = combineReducers({
    dailies,
});

export default rootReducer;
