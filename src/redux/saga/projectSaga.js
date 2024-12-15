import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, projects } from "../../utils/Constants";
import {
  getProjects,
  setProjects,
  setProject,
  createProjectSuccess,
  createProjectFailure,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProjectSuccess,
  deleteProjectFailure,
} from "../Actions/projectActions";

// Saga to get all projects
function* getProjectsSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + projects,
    });

    if (response?.success) {
      yield put(setProjects(response.data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch projects",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to get a project by ID
function* getProjectByIdSaga(action) {
  try {
    const { payload } = action;

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${projects}/${payload}`,
    });

    if (response?.success) {
      yield put(setProject(response.data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the project",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

// Saga to create a project
function* createProjectSaga(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = actions;

    const response = yield ApiRequest.postRequest({
      url: `${api_url}${projects}`,
      data: payload,
      header: "json",
    });

    if (response?.success) {
      yield put(createProjectSuccess(response.data));
      Swal.fire({
        icon: "success",
        title: "Project Created",
        text: "The project has been successfully created.",
      });
    } else {
      yield put(createProjectFailure(response.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create project",
      });
    }
  } catch (error) {
    yield put(createProjectFailure(error.message));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to update a project
function* updateProjectSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const { id, data } = action.payload;

    const response = yield ApiRequest.putRequest({
      url: `${api_url}${projects}/${id}`,
      data: data,
      header: "json",
    });

    if (response?.success) {
      yield put(updateProjectSuccess(response.data));
      yield put(getProjects());
      Swal.fire({
        icon: "success",
        title: "Project Updated",
        text: "The project has been successfully updated.",
      });
    } else {
      yield put(updateProjectFailure(response.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update project",
      });
    }
  } catch (error) {
    yield put(updateProjectFailure(error.message));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to delete a project
function* deleteProjectSaga(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: "Are you sure you want to delete this project?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${projects}/${payload}`,
      });

      if (response?.success) {
        yield put(deleteProjectSuccess(payload));
        yield put(getProjects());
        Swal.fire({
          title: "Deleted!",
          text: "The project has been deleted successfully.",
          icon: "success",
        });
      } else {
        yield put(deleteProjectFailure(response.message));
        Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the project. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    yield put(deleteProjectFailure(error.message));
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

export default function* projectSaga() {
  yield takeLeading(actionTypes.GET_PROJECTS, getProjectsSaga);
  yield takeLeading(actionTypes.GET_PROJECT_BY_ID, getProjectByIdSaga);
  yield takeLeading(actionTypes.DELETE_PROJECT, deleteProjectSaga);
  yield takeLeading(actionTypes.CREATE_PROJECT, createProjectSaga);
  yield takeLeading(actionTypes.UPDATE_PROJECT, updateProjectSaga);
}
