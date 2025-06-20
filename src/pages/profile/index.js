import React, {  useEffect, useState } from "react";
import { Navbar, LinearProgressWithLabel } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getFirestore, updateDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadStart, setUploadStart] = useState(false);
  const [profileProgress, setProfileProgress] = useState(0);
  const [profileURL, setProfileURL] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          // get data
          const userData = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log("Current data: ", doc.data());
            setName(doc.data().name);
            setEmail(doc.data().email);
            setPhoneNumber(doc.data().phoneNumber);
            setProfileURL(doc.data().profileURL);
            setUid(user.uid);
          });
        } else {
          navigate("/email-verification");
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  // updateHandler
  const updateHandler = async () => {
    if (name === "") {
      toast("Name required!", { type: "error" });
    } else {
      setLoading(true);
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        name: name,
        phoneNumber: phoneNumber,
      });
      toast("Updated", { type: "success" });
      setLoading(false);
    }
  };
  // upload profile
  const uploadProfileHandler = (e) => {
    setUploadStart(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `profile-images/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProfileProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          setProfileURL(downloadURL);
          const userRef = doc(db, "users", uid);
          await updateDoc(userRef, {
            profileURL: downloadURL,
          });
          setUploadStart(false);
        });
      }
    );
  };
  return (
    <div>
      <Navbar />
      <Box
        component="form"
        sx={{ "& > :not(style)": { width: "100%" } }}
        noValidate
        autoComplete="off"
        style={{ padding: "20px" }}
        >
          <h1>Profile Page</h1>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={name}
            src={profileURL}
            sx={{ width: 156, height: 156 }}
          />
        </Stack>
        <TextField
          type="file"
          id="outlined-basic"
          label=""
          variant="outlined"
          style={{ marginTop: "15px" }}
          onChange={(e) => uploadProfileHandler(e)}
        />
        <LinearProgressWithLabel
          show={uploadStart}
          progress={profileProgress}
        />
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          style={{ marginTop: "15px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          style={{ marginTop: "15px" }}
          value={email}
          disabled
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          style={{ marginTop: "15px" }}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Button
          variant="contained"
          disableElevation
          style={{ marginTop: "15px" }}
          onClick={updateHandler}
        >
          {loading ? (
            <CircularProgress style={{ color: "white" }} size={20} />
          ) : (
            "Update"
          )}
        </Button>
      </Box>
    </div>
  );
};
export default Profile;
