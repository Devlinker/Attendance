import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";

function PrivateRoute({ element }) {
  const { isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      {ROUTES.map(({ path, element, isPrivate }) => (
          <Route
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute element={<Layout>{element}</Layout>} />
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
