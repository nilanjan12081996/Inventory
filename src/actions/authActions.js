import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './authActionTypes';

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: { token },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});
