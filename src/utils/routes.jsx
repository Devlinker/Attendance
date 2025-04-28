import { Navigate } from "react-router-dom";
import Signin from "../Pages/signin";
// import Signup from "../Pages/signup"
import Dashboard from "../Pages/dashboard";
import { dashboardRoute, rootRoute } from "./routeContants";
import Employee from "../Pages/employee";
import AddEmployee from "../Pages/employee/addemployee";
import RegularizeList from "../Pages/regularize";

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
    path: "/employee/add-user/:id?",
    element: <AddEmployee />,
    isPrivate: true,
  },
  {
    path: "/regularize",
    element: <RegularizeList />,
    isPrivate: true,
  },
  {
    path: rootRoute,
    element: <Navigate to="/signin" />,
  },
];
