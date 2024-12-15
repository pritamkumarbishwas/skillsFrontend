import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import dashboardSaga from "./dashboardSaga";
import projectSaga from "./projectSaga";
import taskSaga from "./taskSaga";
import userSaga from "./userSaga";
export default function* rootSaga() {
  yield all([
    authSaga(),
    taskSaga(),
    userSaga(),
    dashboardSaga(),
    projectSaga(),
  ]);
}
