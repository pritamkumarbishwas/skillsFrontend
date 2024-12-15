import * as actionTypes from "../actionTypes";

const initialState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  success: false,
};

const userReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };

    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false,
        error: null,
        success: true,
      };

    case actionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case actionTypes.GET_USER_BY_ID:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };

    case actionTypes.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        selectedUser: payload,
        isLoading: false,
        error: null,
        success: true,
      };

    case actionTypes.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default userReducer;
