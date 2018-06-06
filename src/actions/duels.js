import request from '../helpers/request';

export const FETCH_DUELS_SUCCESS = 'FETCH_DUELS_SUCCESS';
// export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';

export const ADD_DUEL = 'ADD_DUEL';
export const REMOVE_DUEL = 'REMOVE_DUEL';

export const START_DUEL = 'START_DUEL';
export const ACCEPT_DUEL = 'ACCEPT_DUEL';
export const CONFIRM_DUEL = 'CONFIRM_DUEL';

export const fetchDuels = () => (
  dispatch => {
    request('/users/1/duels')                                   //CHANGE ME
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_DUELS_SUCCESS, payload: response.data.data})
    })
  }
)

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
