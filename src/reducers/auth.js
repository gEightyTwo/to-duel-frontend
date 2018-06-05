import {
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  GET_USER,
  NOT_LOGGED_IN,
  USER_LOGOUT
} from '../actions/auth';

let initialState = {
  isLoading: false,
  user: {},
  showLoginError: false,
  showSignupError: false,
  authorized: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_PENDING:
      return {...state, isLoading: true};
    case USER_LOGIN_SUCCESS:
      return {...state, isLoading: false, user: action.payload, authorized: true};
    case USER_LOGIN_FAILED:
      return {...state, isLoading: false, showLoginError: true};
    case USER_SIGNUP_PENDING:
      return {...state, isLoading: true};
    case USER_SIGNUP_SUCCESS:
      return {...state, isLoading: false};
    case USER_SIGNUP_FAILED:
      return {...state, isLoading: false, showSignupError: true};
    case GET_USER:
      return {...state, isLoading: false, user: action.payload, authorized: true};
    case NOT_LOGGED_IN:
      return {...state, isLoading: false, authorized: false};
    case USER_LOGOUT:
      return {...state, user: {}, authorized: false};
    default:
      return state;
  }
};
