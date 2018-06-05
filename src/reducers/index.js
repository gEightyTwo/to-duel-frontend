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


function counter(state = 0, action) { //state is the existing state
  console.log(state, action)
  switch(action.type){
    case ADD:
      return state + action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
    counter: counter
});

export default rootReducer;
