import { Navigate } from "react-router-dom"
import Signin from "../Pages/signin"
// import Signup from "../Pages/signup"
import Dashboard from "../Pages/dashboard"

export const ROUTES =[
    {
        path: "/signin",
        element: <Signin />,
    },
    // {
    //     path: "/signup", 
    //     element: <Signup />,
    // },
    {
        path:"/dashboard",
        element:<Dashboard/>,
        isPrivate:true,
    },
    {
        path: "/",
        element: <Navigate to="/signin" />
    }
    
]