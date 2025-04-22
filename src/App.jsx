import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ROUTES } from "./utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./shared/profile";
import AppLayout from "./Layout";
import "./global.css"

function PrivateRoute({ element }) {
  const { isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return element;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, element, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute element={<AppLayout>{element}</AppLayout>} />
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
