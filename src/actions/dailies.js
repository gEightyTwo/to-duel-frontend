import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';
// export const START_DUEL = 'START_DUEL';
// export const ACCEPT_DUEL = 'ACCEPT_DUEL';
// export const CONFIRM_DUEL = 'CONFIRM_DUEL';

export const fetchDailies = (id) => (
  dispatch => {
    request(`/users/${id}/dailies`)
    .then((response) => {
      dispatch({type: FETCH_DAILIES_SUCCESS, payload: response.data.data})
    })
  }
)

export const addDaily = (name, userId) => (
  dispatch => {
    request(`/users/${userId}/dailies`, 'post', {name})
    .then((response) => {
      dispatch(fetchDailies(userId))
    })
  }
);

// export const handleCheck = (userId, dailyId, completed) => (
//   dispatch => {
//     request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'post', {completed})
//     .then((response) => {
//       dispatch(fetchDailies(userId))
//     })
//   }
// );

export const deleteDaily = (userId, dailyId) => (
  dispatch => {
    request(`/users/${userId}/dailies/${dailyId}`, 'patch', {archived: true})
    .then((response) => {
      dispatch(fetchDailies(userId))
    })
  }
);

// export const startDuel = () => (
//   dispatch => {
//
//   }
// );
//
// export const acceptDuel = () => (
//   dispatch => {
//
//   }
// );
//
// export const confirmDuel = () => (
//   dispatch => {
//
//   }
// );
