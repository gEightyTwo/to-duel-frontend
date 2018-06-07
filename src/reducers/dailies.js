import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_DAILIES_SUCCESS,
  // FETCH_DAILIES_FAIL,
  REMOVE_DAILY,
  START_DUEL,
  ACCEPT_DUEL,
  CONFIRM_DUEL,
} from '../actions/dailies'


const addCompletedStatus = (oldState, newStatus) => {
  console.log(oldState)
  const newState = oldState.map(oldEle => {
    console.log(oldEle.id, newStatus.id)
    if (oldEle.id === newStatus.id) {
      console.log({...oldEle, completed: newStatus.completed})
      return  {...oldEle, completed: newStatus.completed}
    } else {
      return oldEle
    }
  })
  console.log(newState)
  return newState
}

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
