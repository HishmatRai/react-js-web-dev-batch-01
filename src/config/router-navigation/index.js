import React from "react";
import { Home, Login, PageNotFound, Signup } from "../../pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const RouterNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
