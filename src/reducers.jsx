/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./shared/login";
import UserReducer from "./shared/userlist";
import SignupReducer from "./shared/signup";
import ProfileReducer from "./shared/profile";
import checkinreducer from "./shared/checkin";
import calenderreducer from "./shared/calendar"

export default function createReducer(history) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
    Signup: SignupReducer,
    user: UserReducer,
    profile: ProfileReducer,
    checkin: checkinreducer,
    calender: calenderreducer,
  });

  return rootReducer;
}
