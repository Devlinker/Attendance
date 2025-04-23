import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./shared/login";
// import UserReducer from "./shared/userlist";
// import SignupReducer from "./shared/signup";
import ProfileReducer from "./shared/profile";
import dashboardreducer from "./shared/dashboard";
import employeereducer from "./shared/employee";
import projectsreducer from "./shared/projects"
import companyreducer from "./shared/company";

export default function createReducer(history) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
    // Signup: SignupReducer,
    // user: UserReducer,
    profile: ProfileReducer,
    dashboard: dashboardreducer,
    employee: employeereducer,
    projects: projectsreducer,
    company: companyreducer,
  });

  return rootReducer;
}
