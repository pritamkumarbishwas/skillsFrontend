import * as actionTypes from "../actionTypes";

// Login Actions
export const loginSuccess = (userEmail) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: userEmail,
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const loginRequest = (email, password) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: { email, password },
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

// Register Actions
export const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  payload: error,
});

export const registerRequest = (data) => ({
  type: actionTypes.REGISTER_REQUEST,
  payload: data,
});
