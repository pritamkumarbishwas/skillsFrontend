import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, users } from "../../utils/Constants";
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
} from "../Actions/usersActions";

function* getUsers() {
  try {
    yield put({ type: actionTypes.GET_USERS });

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${users}`,
    });

    if (response?.success) {
      yield put(fetchUsersSuccess(response.data));
    } else {
      yield put(fetchUsersFailure(response.error || "Failed to fetch users"));
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: response.error || "Unable to fetch users.",
      });
    }
  } catch (error) {
    yield put(fetchUsersFailure("An error occurred while fetching users"));
    console.error("Get Users Error:", error);
    Swal.fire({
      icon: "error",
      title: "Fetch Failed",
      text: "An error occurred while fetching users.",
    });
  }
}

function* getUserById(action) {
  try {
    yield put({ type: actionTypes.GET_USER_BY_ID });

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${users}/${action.payload}`,
    });

    if (response?.success) {
      yield put(fetchUserByIdSuccess(response.data));
    } else {
      yield put(fetchUserByIdFailure(response.error || "Failed to fetch user"));
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: response.error || "Unable to fetch user details.",
      });
    }
  } catch (error) {
    yield put(
      fetchUserByIdFailure("An error occurred while fetching user details")
    );
    console.error("Get User By ID Error:", error);
    Swal.fire({
      icon: "error",
      title: "Fetch Failed",
      text: "An error occurred while fetching user details.",
    });
  }
}

export default function* userSaga() {
  yield takeLeading(actionTypes.GET_USERS, getUsers);
  yield takeLeading(actionTypes.GET_USER_BY_ID, getUserById);
}
