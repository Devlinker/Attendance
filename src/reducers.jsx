import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./shared/login";
// import UserReducer from "./shared/userlist";
// import SignupReducer from "./shared/signup";
import ProfileReducer from "./shared/profile";
import dashboardreducer from "./shared/dashboard";
import employeereducer from "./shared/employee";

export default function createReducer(history) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
    // Signup: SignupReducer,
    // user: UserReducer,
    profile: ProfileReducer,
    dashboard: dashboardreducer,
    employee: employeereducer,
  });

  return rootReducer;
}
