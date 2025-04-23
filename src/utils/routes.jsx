import { Navigate } from "react-router-dom";
import Signin from "../Pages/signin";
// import Signup from "../Pages/signup"
import Dashboard from "../Pages/dashboard";
import AddUser from "../Pages/employee/addUser";
import { dashboardRoute, rootRoute } from "./routeContants";
import Employee from "../Pages/employee";

export const ROUTES = [
  {
    path: "/signin",
    element: <Signin />,
  },
  // {
  //     path: "/signup",
  //     element: <Signup />,
  // },
  {
    path: dashboardRoute,
    element: <Dashboard />,
    isPrivate: true,
  },
  {
    path: "/employee",
    element: <Employee />,
    isPrivate: true,
  },
  {
    path: "/employee/add-user",
    element: <AddUser />,
    isPrivate: true,
  },
  {
    path: rootRoute,
    element: <Navigate to="/signin" />,
  },
];
