import request from '../helpers/request';

export const FETCH_DUELS_SUCCESS = 'FETCH_DUELS_SUCCESS';
// export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';

export const FETCH_DUEL_SUCCESS = 'FETCH_DUEL_SUCCESS';

export const ADD_DUEL = 'ADD_DUEL';
export const REMOVE_DUEL = 'REMOVE_DUEL';

export const START_DUEL = 'START_DUEL';
export const ACCEPT_DUEL = 'ACCEPT_DUEL';
export const CONFIRM_DUEL = 'CONFIRM_DUEL';

export const fetchDuels = (id) => (
  dispatch => {
    request(`/users/${id}/duels`)                                   //CHANGE ME
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_DUELS_SUCCESS, payload: response.data.data})
    })
  }
)

export const fetchDuel = (id, duelId) => (
  dispatch => {
    request(`/users/${id}/duels/${duelId}`)                                   //CHANGE ME
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_DUEL_SUCCESS, payload: response.data.data})
    })
  }
)

export const addDuel = (newUser, history) => (
  dispatch => {

  }
);

export const removeDuel = () => (
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
