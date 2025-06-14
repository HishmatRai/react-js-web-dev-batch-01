import React from "react";
import { RouterNavigation } from "./config";
import { ToastContainer } from "react-toastify";

import "./App.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <RouterNavigation />
    </div>
  );
};
export default App;
