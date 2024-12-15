import * as actionTypes from "../actionTypes";

const initialState = {
  userEmail: null,
  isAuthenticated: false,
  error: null,
  success: false,
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        userEmail: payload,
        isAuthenticated: true,
        error: null,
        success: true,
      };
    }

    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        error: payload,
        success: false,
      };
    }

    case actionTypes.LOGOUT: {
      return {
        ...initialState,
        isAuthenticated: false,
        success: false,
      };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        userEmail: payload?.email || null,
        isAuthenticated: false,
        error: null,
        success: true,
      };
    }

    case actionTypes.REGISTER_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        error: payload,
        success: false,
      };
    }

    case actionTypes.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
        success: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
