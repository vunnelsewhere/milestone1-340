import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import UserInfoProvider from "./components/userInfo/UserInfoProvider";
import ToastProvider from "./components/toaster/ToastProvider";

library.add(fab);

const container = document.getElementById("root")!;
const root = createRoot(container);

// App = parent of all the components
// providers
// https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
root.render(
  <UserInfoProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </UserInfoProvider>
);
