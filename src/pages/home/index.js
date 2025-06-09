import React from "react";
import { Navbar, Button ,Footer} from "../../components";
const Home = () => {
  const loginHandler = () => {
    alert("log in function");
  };
  return (
    <div>
      <Navbar activePage="Home" />
      <h1>Home Page</h1>
      <hr />
      <Button title="Log In" onClick={loginHandler} />
      <Button
        title="Sign Up"
        borderRadius={true}
        onClick={() => console.log("sign up")}
      />
      <Button title="Update" color="blue" />
      <Button title="Edit" borderRadius={true} />
      <Button title="Log Out" />
      <Button title="Delete" color="yellow" />
      <Button />
      <Footer />
    </div>
  );
};
export default Home;
