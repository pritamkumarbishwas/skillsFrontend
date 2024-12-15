import * as actionTypes from "../actionTypes";

export const fetchUsers = () => ({
  type: actionTypes.GET_USERS,
});

export const fetchUsersSuccess = (users) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: actionTypes.GET_USERS_FAILURE,
  payload: error,
});

export const fetchUserById = (id) => ({
  type: actionTypes.GET_USER_BY_ID,
  payload: id,
});

export const fetchUserByIdSuccess = (user) => ({
  type: actionTypes.GET_USER_BY_ID_SUCCESS,
  payload: user,
});

export const fetchUserByIdFailure = (error) => ({
  type: actionTypes.GET_USER_BY_ID_FAILURE,
  payload: error,
});

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS,
});
