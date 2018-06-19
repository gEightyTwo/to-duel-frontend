import request from '../helpers/request';
var moment = require('moment');

export const FETCH_DUELS_SUCCESS = 'FETCH_DUELS_SUCCESS';
// export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';

export const FETCH_DUEL_SUCCESS = 'FETCH_DUEL_SUCCESS';

export const ADD_DUEL = 'ADD_DUEL';
export const REMOVE_DUEL = 'REMOVE_DUEL';

export const START_DUEL = 'START_DUEL';
export const ACCEPT_DUEL = 'ACCEPT_DUEL';

export const FETCH_OPPONENTS = 'FETCH_OPPONENTS'

export const fetchDuels = (id) => (
  dispatch => {
    request(`/users/${id}/duels`)
    .then((response) => {
      dispatch({type: FETCH_DUELS_SUCCESS, payload: response.data.data})
    })
  }
)

export const fetchDuel = (id, duelId) => (
  dispatch => {
    request(`/users/${id}/duels/${duelId}`)
    .then((response) => {
      dispatch({type: FETCH_DUEL_SUCCESS, payload: response.data.data})
    })
  }
)
export const fetchOpponents = () => (
  dispatch => {
    request(`/users`)
    .then((response) => {
      dispatch({type: FETCH_OPPONENTS, payload: response.data.data})
    })
  }
)

export const addDuel = (
  id,
  u2_id,
  value,
  startTime = moment().day(1+7).hours(0).minutes(0).seconds(0).format("YYYY-MM-DDTH:mm:ss"),
  endTime = moment().day(5+7).hours(23).minutes(59).seconds(59).format("YYYY-MM-DDTH:mm:ss")
) => {
  return dispatch => {
    request(`/users/${id}/duels`, `post`, {u2_id: u2_id, dailies: value, startTime, endTime})
    .then(response => {
      dispatch({type: ADD_DUEL, payload: response.data.data})
    })
    .then(()=>{
      dispatch(fetchDuels(id))
    })
  }
};

export const rejectDuel = (userId, duelId) => (
  dispatch => {
    request(`/users/${userId}/duels/${duelId}`, 'patch', {rejected: moment().format("YYYY-MM-DDTH:mm:ss")})
    .then((response) => {
      dispatch(fetchDuels(userId))
    })
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

export const confirmDuel = (userId, duelId) => (
  dispatch => {
    request(`/users/${userId}/duels/${duelId}`, 'patch', {u1_confirmed: true})
    .then((response) => {
      dispatch(fetchDuels(userId))
    })
  }
);
