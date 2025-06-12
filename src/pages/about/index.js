import React from "react";
import { Navbar, Button, Footer, Card, Layout } from "../../components";
const About = () => {
  return (
    <Layout activePage="About" >
      {/* <Navbar activePage="About" /> */}
      <h1>About Page</h1>
      <hr />
      <Card />
     
      <Button title="Log In" borderRadius={true} color="blue" />
      {/* <Footer /> */}
    </Layout>
  );
};
export default About;
