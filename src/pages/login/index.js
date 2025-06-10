import React, { useState } from "react";
import { Navbar, Footer, Button, Input ,Layout} from "../../components";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const loginHandler = () => {
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    if (email === "") {
      setMessage("Email required!");
    } else if (!email.match(re)) {
      setMessage("Enter valid email address");
    } else if (password === "") {
      setMessage("Password Required");
    } else {
      const user = {
        email: email,
        password: password,
      };
      setMessage("Success");
      setMessageType("success");
      setEmail("");
      setPassword("");
      console.log("user", user);
    }
  };
  return (
    <Layout>
      {/* <Navbar activePage="Login" /> */}
      <h1>Login Page</h1>
      <hr />
      <Input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        title="Log In"
        onClick={loginHandler}
        color="blue"
        borderRadius={true}
      />
      <p style={{ color: messageType === "error" ? "red" : "green" }}>
        {message}
      </p>
      {/* <Footer /> */}
    </Layout>
  );
};
export default Login;
