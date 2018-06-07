import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';
// export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';
export const FETCH_DAILY_COMPLETED_STATUS = 'FETCH_DAILY_COMPLETED_STATUS';
export const REMOVE_DAILY = 'REMOVE_DAILY';

export const START_DUEL = 'START_DUEL';
export const ACCEPT_DUEL = 'ACCEPT_DUEL';
export const CONFIRM_DUEL = 'CONFIRM_DUEL';

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

export const handleCheck = (userId, dailyId, completed) => (
  dispatch => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'post', {completed})
    .then((response) => {
      dispatch(fetchDailies(userId))
    })
  }
);

export const fetchCompletedStatus = (userId, dailyId) => (
  dispatch => {
    console.log(userId, dailyId)
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'get')
    .then((res) => {
      console.log(res.data.data)
      if(res.data.data) {
        dispatch({type: FETCH_DAILY_COMPLETED_STATUS, payload: res.data.data})
      } else {
        dispatch({type: FETCH_DAILY_COMPLETED_STATUS, payload: {completed: false}})
      }
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
