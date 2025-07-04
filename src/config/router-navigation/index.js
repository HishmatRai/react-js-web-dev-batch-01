import React from "react";
import {
  Home,
  Login,
  PageNotFound,
  Signup,
  EmailVerification,
  Profile,
  CreateBlog,
  Dashboard,
  BlogDetails,
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
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
