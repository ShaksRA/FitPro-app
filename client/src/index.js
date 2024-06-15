import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./react-redux/store";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

const renderApp = () => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

// Ensure that the entire app is rendered when DOM content is fully loaded
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    rootElement
  );
} else {
  renderApp();
}

// For hot module replacement (HMR) during development
if (module.hot) {
  module.hot.accept("./App", () => {
    setTimeout(renderApp);
  });
}
