import * as actionTypes from "../actionTypes";

export const getTasks = () => ({
  type: actionTypes.GET_TASKS,
});

export const setTasks = (payload) => ({
  type: actionTypes.SET_TASKS,
  payload,
});

export const getTaskById = (payload) => ({
  type: actionTypes.GET_TASK_BY_ID,
  payload,
});

export const setTask = (payload) => ({
  type: actionTypes.SET_TASK,
  payload,
});

export const createTask = (payload) => ({
  type: actionTypes.CREATE_TASK,
  payload,
});

export const createTaskSuccess = (payload) => ({
  type: actionTypes.CREATE_TASK_SUCCESS,
  payload,
});

export const createTaskFailure = (payload) => ({
  type: actionTypes.CREATE_TASK_FAILURE,
  payload,
});

export const updateTask = (id, data) => ({
  type: actionTypes.UPDATE_TASK,
  payload: { id, data },
});

export const updateTaskSuccess = (payload) => ({
  type: actionTypes.UPDATE_TASK_SUCCESS,
  payload,
});

export const updateTaskFailure = (payload) => ({
  type: actionTypes.UPDATE_TASK_FAILURE,
  payload,
});

export const deleteTask = (payload) => ({
  type: actionTypes.DELETE_TASK,
  payload,
});

export const deleteTaskSuccess = (payload) => ({
  type: actionTypes.DELETE_TASK_SUCCESS,
  payload,
});

export const deleteTaskFailure = (payload) => ({
  type: actionTypes.DELETE_TASK_FAILURE,
  payload,
});
