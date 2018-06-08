import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  FETCH_DUELS_SUCCESS,
  FETCH_DUEL_SUCCESS,
  FETCH_DUELS_FAIL,
  ADD_DUEL,
  REMOVE_DUEL,
  START_DUEL,
  ACCEPT_DUEL,
  CONFIRM_DUEL
} from '../actions/duels'

const duels = (state = [], action) => {
  console.log(state, action)
  switch(action.type){
    case FETCH_DUELS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const duelData = (state = [], action) => {
  console.log(state, action)
  switch(action.type){
    case FETCH_DUEL_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
    duels, duelData
});

export default rootReducer;
