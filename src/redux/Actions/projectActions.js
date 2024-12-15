import * as actionTypes from "../actionTypes";

export const getProjects = () => ({
  type: actionTypes.GET_PROJECTS,
});

export const setProjects = (payload) => ({
  type: actionTypes.SET_PROJECTS,
  payload,
});

export const getProjectById = (payload) => ({
  type: actionTypes.GET_PROJECT_BY_ID,
  payload,
});

export const setProject = (payload) => ({
  type: actionTypes.SET_PROJECT,
  payload,
});

export const createProject = (payload) => ({
  type: actionTypes.CREATE_PROJECT,
  payload,
});

export const createProjectSuccess = (payload) => ({
  type: actionTypes.CREATE_PROJECT_SUCCESS,
  payload,
});

export const createProjectFailure = (payload) => ({
  type: actionTypes.CREATE_PROJECT_FAILURE,
  payload,
});

export const updateProject = (id, data) => ({
  type: actionTypes.UPDATE_PROJECT,
  payload: { id, data },
});

export const updateProjectSuccess = (payload) => ({
  type: actionTypes.UPDATE_PROJECT_SUCCESS,
  payload,
});

export const updateProjectFailure = (payload) => ({
  type: actionTypes.UPDATE_PROJECT_FAILURE,
  payload,
});

export const deleteProject = (payload) => ({
  type: actionTypes.DELETE_PROJECT,
  payload,
});

export const deleteProjectSuccess = (payload) => ({
  type: actionTypes.DELETE_PROJECT_SUCCESS,
  payload,
});

export const deleteProjectFailure = (payload) => ({
  type: actionTypes.DELETE_PROJECT_FAILURE,
  payload,
});
