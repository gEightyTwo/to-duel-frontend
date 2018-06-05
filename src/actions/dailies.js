import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';
export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';

export const ADD_DAILY = 'ADD_DAILY';
export const REMOVE_DAILY = 'REMOVE_DAILY';

export const START_DUEL = 'START_DUEL';
export const ACCEPT_DUEL = 'ACCEPT_DUEL';
export const CONFIRM_DUEL = 'CONFIRM_DUEL';
export const ADD = 'ADD'

export const fetchDailies = ({email, password}, history) => (
  dispatch => {

  }
);

export function add(value){
  return {
    type: ADD,
    payload: value
  }
}

export const addDaily = (newUser, history) => (
  dispatch => {

  }
);

export const removeDaily = () => (
  dispatch => {

  }
);

export const startDuel = () => (
  dispatch => {

  }
);

export const acceptDuel = () => (
  dispatch => {

  }
);

export const confirmDuel = () => (
  dispatch => {

  }
);
