import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./shared/login";
// import UserReducer from "./shared/userlist";
// import SignupReducer from "./shared/signup";
import ProfileReducer from "./shared/profile";
import dashboardreducer, { regularize } from "./shared/dashboard";
import employeereducer from "./shared/employee";
import projectsreducer from "./shared/projects";
import companyreducer from "./shared/company";
import regularizeReducer from "./shared/regularize";
import passwordreducer from "./shared/changepassword";
import { LOGOUT } from "./shared/ActionTypes";
// import statusreducer from "./shared/changestatus";

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
    // Signup: SignupReducer,
    // user: UserReducer,
    profile: ProfileReducer,
    dashboard: dashboardreducer,
    employee: employeereducer,
    projects: projectsreducer,
    company: companyreducer,
    regularize: regularizeReducer,
    password: passwordreducer,
    // status: statusreducer,
  });

export default function createReducer(history) {
  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      // Clear all state on logout
      state = undefined;
    }
    return appReducer(history)(state, action);
  };

  return rootReducer;
}
