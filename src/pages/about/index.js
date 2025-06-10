import React from "react";
import { Navbar, Button, Footer, Card, Layout } from "../../components";
const About = () => {
  return (
    <Layout>
      {/* <Navbar activePage="About" /> */}
      <h1>About Page</h1>
      <hr />
      <Card title="Card 1">
        <h1>Web Development</h1>
        <h1>Web Development</h1>
        <h1>Web Development</h1>
        <h1>Web Development</h1>
        <form>
          <input />
        </form>
        <table>
          <tr>
            <td>fsdf</td>
            <td>fsdf</td>
            <td>fsdf</td>
          </tr>
        </table>
      </Card>
      <Card title="Card 2">
        <p>Web Development</p>
      </Card>
      <Card title="Card 3">
        <ul>
          <li>Web Development</li>
        </ul>
      </Card>

      <Button title="Log In" borderRadius={true} color="blue" />
      {/* <Footer /> */}
    </Layout>
  );
};
export default About;
