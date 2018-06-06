import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';
// export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';

export const ADD_DAILY = 'ADD_DAILY';
export const REMOVE_DAILY = 'REMOVE_DAILY';

export const START_DUEL = 'START_DUEL';
export const ACCEPT_DUEL = 'ACCEPT_DUEL';
export const CONFIRM_DUEL = 'CONFIRM_DUEL';

export const fetchDailies = (id) => (
  dispatch => {
    console.log('!!! inside of fetchDailies')
    request(`/users/${id}/dailies`)
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_DAILIES_SUCCESS, payload: response.data.data})
    })
  }
)

export const addDaily = (name, users_id) => (
  dispatch => {
    request(`/users/${users_id}/dailies`, 'post', {name})
    .then((response) => {
      console.log(response)
      dispatch({type: ADD_DAILY, payload: response.data.data})
    })
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
