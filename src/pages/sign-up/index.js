import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signUpHandler = async () => {
    if (name === "") {
      toast("Name required!", { type: "error" });
    } else if (email === "") {
      toast("Email required!", { type: "error" });
    } else if (password === "") {
      toast("Password required!", { type: "error" });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser).then(async () => {
            await setDoc(doc(db, "users", user.uid), {
              name: name,
              email: email,
            });
            toast("Success", { type: "success" });
            setLoading(false);
            navigate("/email-verification");
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          toast(errorMessage, { type: "error" });
        });
    }
  };
  return (
    <div className="form-container">
      <div className="wrapper signUp">
        <div className="illustration">
          <img
            src="https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg?semt=ais_hybrid&w=740"
            alt="illustration"
          />
        </div>
        <div className="form">
          <div className="heading">CREATE AN ACCOUNT</div>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>E-Mail</label>
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter you password"
            />
          </div>
          <button onClick={signUpHandler}>
            {loading ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              " Sign Up"
            )}
          </button>
          <h2 align="center" className="or">
            OR
          </h2>
          <p>
            Have an account ? <Link to="/login"> Login </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
