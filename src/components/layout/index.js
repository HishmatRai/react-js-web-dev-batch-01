import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
const Layout = ({ children,activePage }) => {
  return (
    <div>
      <Navbar  activePage={activePage}/>
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
