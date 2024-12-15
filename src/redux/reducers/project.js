import * as actionTypes from "../actionTypes";

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
  success: false,
};

const project = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
        error: null,
        success: false,
      };

    case actionTypes.SET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
        error: null,
        success: false,
      };

    case actionTypes.CREATE_PROJECT:
    case actionTypes.UPDATE_PROJECT:
    case actionTypes.DELETE_PROJECT:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, payload],
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === payload.id ? payload : project
        ),
        project: payload,
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== payload),
        loading: false,
        error: null,
        success: true,
      };

    case actionTypes.CREATE_PROJECT_FAILURE:
    case actionTypes.UPDATE_PROJECT_FAILURE:
    case actionTypes.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };

    default:
      return state;
  }
};

export default project;
