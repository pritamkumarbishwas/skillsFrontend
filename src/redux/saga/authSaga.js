import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  login_endpoint,
  register_endpoint,
} from "../../utils/Constants";
import { registerSuccess, registerFailure } from "../Actions/authActions";

function* loginUser(action) {
  try {
    const { email, password } = action.payload;

    // Show loading state
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${login_endpoint}`,
      header: "json",
      data: { email, password },
    });

    if (response?.success) {
      // Store user tokens in local storage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Dispatch login success action
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        payload: response.userEmail,
      });

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      // Handle login failure
      yield put({
        type: actionTypes.LOGIN_FAILURE,
        payload: response.error || "Login failed. Please try again.",
      });
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: response.error || "Invalid credentials.",
      });
    }
  } catch (error) {
    console.error("Login error: ", error);
    yield put({ type: actionTypes.LOGIN_FAILURE, payload: "Server Error" });
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "An error occurred. Please try again.",
    });
  } finally {
    // Hide loading state
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* registerUser(action) {
  try {
    const { payload } = action;

    // Show loading state
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${register_endpoint}`,
      data: payload,
      header: "json",
    });

    if (response?.success) {
      yield put(registerSuccess(response.data));

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in with your credentials.",
        showConfirmButton: true,
      });

    } else {

      yield put(registerFailure(response.message || response.error));

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: response.error || "Please try again.",
      });
    }
  } catch (error) {
    yield put(registerFailure(error.message));

    console.error("Registration error: ", error);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: "An error occurred. Please try again.",
    });
  } finally {
    // Hide loading state
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* logoutUser() {
  try {
    // Clear user data from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Dispatch logout action
    yield put({ type: actionTypes.LOGOUT });

    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    console.error("Logout error: ", error);
  }
}

export default function* authSaga() {
  yield takeLeading(actionTypes.LOGIN_REQUEST, loginUser);
  yield takeLeading(actionTypes.REGISTER_REQUEST, registerUser);
  yield takeLeading(actionTypes.LOGOUT, logoutUser);
}
