import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export default function Login() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
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
  // loginwithGoogleHandler
  const loginwithGoogleHandler = () => {
    setGoogleLoader(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userData = onSnapshot(
          doc(db, "users", user.uid),
          async (userRes) => {
            if (!userRes.data()) {
              await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
              });
            }
            console.log("Current data: ");
          }
        );

        // console.log("user", user);
        toast("Signed in", { type: "success" });
        setGoogleLoader(false);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage, { type: "error" });
        setGoogleLoader(false);
      });
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
          <button onClick={loginwithGoogleHandler}>
            {googleLoader ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Login with Google"
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
