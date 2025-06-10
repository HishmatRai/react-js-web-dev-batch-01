import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar  activePage="fsdf"/>
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
