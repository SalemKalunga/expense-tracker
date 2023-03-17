import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PopupContextProvider } from "./contexts/popup.context";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/user_context.component";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <PopupContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </PopupContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();

reportWebVitals();
