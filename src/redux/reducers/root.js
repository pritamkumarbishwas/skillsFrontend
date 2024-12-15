import { combineReducers } from "redux";
import authReducer from "./auth";
import dashboard from "./dashboard";
import project from "./project";
import task from "./task";
import userReducer from "./users";
const rootReducer = combineReducers({
  dashboard,
  project,
  task,
  users: userReducer,
  auth: authReducer,
});

export default rootReducer;
