import React from "react";
import { Navbar, Button, Footer } from "../../components";
const About = () => {
  return (
    <div>
      <Navbar activePage="About" />
      <h1>About Page</h1>
      <hr />
      <Button title="Log In" borderRadius={true} color="blue" />
      <Footer />
    </div>
  );
};
export default About;
