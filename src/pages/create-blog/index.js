import React, { useEffect, useState } from "react";
import { Navbar, LinearProgressWithLabel } from "../../components";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getFirestore,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import moment from "moment";
import ReactPlayer from "react-player";
import { v4 as uuidv4 } from "uuid";
let uuid = uuidv4();
const CreateBlog = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadStart, setUploadStart] = useState(false);
  const [fileProgress, setFileProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [fileType, setFileType] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          setUid(user.uid);
        } else {
          navigate("/email-verification");
        }
      } else {
        navigate("/");
      }
    });
  }, []);
  // createBlogHandler
  const createBlogHandler = async () => {
    if (fileURL === "") {
      toast("File required!", { type: "error" });
    } else if (title === "") {
      toast("Title required!", { type: "error" });
    } else if (title.length < 100) {
      toast("Title required (100)", { type: "error" });
    } else if (details === "") {
      toast("Details required!", { type: "error" });
    } else if (details.length < 250) {
      toast("Details required (250)", { type: "error" });
    } else {
      setLoading(true);
      const newBlog = {
        fileURL: fileURL,
        title: title,
        details: details,
        likes: [],
        comments: [],
        share: 0,
        createdAt: moment().format(),
        fileID: uuid,
        fileType: fileType,
        userID: uid,
      };
      const docRef = await addDoc(collection(db, "blogs"), newBlog);
      const blogRef = doc(db, "blogs", docRef.id);
      await updateDoc(blogRef, {
        blogID: docRef.id,
      });
      toast("New blog created", { type: "success" });
      setLoading(false);
      window.location.reload();
    }
  };

  // upload file
  const uploadBlogFile = (e) => {
    const file = e.target.files[0];
    if (
      file.type.slice(0, 5) === "image" ||
      file.type.slice(0, 5) === "video"
    ) {
      setUploadStart(true);

      const storageRef = ref(storage, `blog-files/${uuid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setFileProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            setFileURL(downloadURL);
            setFileType(file.type.slice(0, 5));
            setUploadStart(false);
          });
        }
      );
    } else {
      toast("File name image required", { type: "error" });
    }
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
        <h1>Create Blog Page</h1>
        <TextField
          type="file"
          id="outlined-basic"
          accept="image/*"
          label=""
          variant="outlined"
          style={{ marginTop: "15px" }}
          onChange={(e) => uploadBlogFile(e)}
        />
        {fileType !== "" && (
          <div>
            {fileType === "image" ? (
              <img
                src={fileURL}
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "5px",
                  margin: "15px 0px",
                }}
              />
            ) : (
              <ReactPlayer
                style={{
                  borderRadius: "5px",
                }}
                width={"250px"}
                height={"250px"}
                controls={true}
                url={fileURL}
              />
            )}
          </div>
        )}

        <LinearProgressWithLabel show={uploadStart} progress={fileProgress} />
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          style={{ marginTop: "15px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title.length !== 0 && (
          <p
            style={{
              textAlign: "right",
              marginTop: "15px",
              paddingRight: "30px",
            }}
          >
            {title.length}
          </p>
        )}
        <TextField
          id="outlined-textarea"
          label="Details"
          placeholder="Details"
          multiline
          style={{ marginTop: "15px" }}
          rows={7}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        {details.length !== 0 && (
          <p
            style={{
              textAlign: "right",
              marginTop: "15px",
              paddingRight: "30px",
            }}
          >
            {details.length}
          </p>
        )}
        <Button
          variant="contained"
          disableElevation
          style={{ marginTop: "15px" }}
          onClick={createBlogHandler}
        >
          {loading ? (
            <CircularProgress style={{ color: "white" }} size={20} />
          ) : (
            "Create"
          )}
        </Button>
      </Box>
    </div>
  );
};
export default CreateBlog;
