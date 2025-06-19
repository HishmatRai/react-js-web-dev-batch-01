import React from "react";
import {
  Home,
  Login,
  PageNotFound,
  Signup,
  EmailVerification,
  Profile,
} from "../../pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const RouterNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
