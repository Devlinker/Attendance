import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import configureStore from "./Store.jsx";
// import MyComponent from "./components/inputerror/index.jsx";

const { store, persistor } = configureStore();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      {/* <MyComponent /> */}
    </StrictMode>
  </Provider>
);
