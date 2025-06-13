import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
    const signUpHandler =()=>{
        console.log("sign up")
    }
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
            <label >Name</label>
            <input type="text"  placeholder="Enter your name" />
          </div>
          <div>
            <label >E-Mail</label>
            <input type="text"  placeholder="Enter your mail" />
          </div>
          <div>
            <label >Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
            />
          </div>
          <button  onClick={signUpHandler}>Sign Up</button>
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
