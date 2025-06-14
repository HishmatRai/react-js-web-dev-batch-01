import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginHandler = () => {
    if (email === "") {
      toast("Email required", { type: "error" });
    } else if (password === "") {
      toast("Password required", { type: "error" });
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast("Signed in", { type: "success" });
          setLoading(false);
          if (user.emailVerified) {
            navigate("/");
          } else {
            navigate("/email-verification");
          }
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast(errorMessage, { type: "error" });
          setLoading(false);
        });
    }
  };
  return (
    <div className="form-container">
      <div className="wrapper signIn">
        <div className="illustration">
          <img
            src="https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg?semt=ais_hybrid&w=740"
            alt="illustration"
          />
        </div>
        <div className="form">
          <div className="heading">LOGIN</div>
          <div>
            <label>E-Mail</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter you password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={loginHandler}>
            {loading ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Log In"
            )}
          </button>
          <p>
            Don't have an account ? <Link to="/signup"> Sign Up </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
