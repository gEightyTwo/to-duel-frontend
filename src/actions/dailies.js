import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';
// export const FETCH_DAILIES_FAIL= 'FETCH_DAILIES_FAIL';

export const ADD_DAILY = 'ADD_DAILY';
export const REMOVE_DAILY = 'REMOVE_DAILY';

export const fetchDailies = () => (
  dispatch => {
    request('/users/1/dailies')                                   //CHANGE ME
    .then((response) => {
      console.log(response)
      dispatch({type: FETCH_DAILIES_SUCCESS, payload: response.data.data})
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
