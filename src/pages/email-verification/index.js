import React, { use, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
const EmailVerification = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, steEmail] = useState("");
  const [resendLoader, setResendLoader] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/");
        } else {
          steEmail(user.email);
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    });
  }, []);

  // re-send
  const reSendHandler = () => {
    setResendLoader(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast("Email verification sent!", { type: "success" });
        setResendLoader(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage, { type: "error" });
        setResendLoader(false);
      });
  };
  return (
    <div>
      <h1>Email Verification Page</h1>
      <p>Email : {loading ? "Loading ..." : email}</p>
      <Button
        variant="contained"
        onClick={reSendHandler}
        disabled={resendLoader}
      >
        {resendLoader ? (
          <CircularProgress style={{ color: "white" }} size={20} />
        ) : (
          "Re-send"
        )}
      </Button>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Home
      </Button>
    </div>
  );
};
export default EmailVerification;
