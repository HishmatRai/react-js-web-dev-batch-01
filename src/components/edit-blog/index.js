import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import ReactPlayer from "react-player";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import LinearProgressWithLabel from "../progress-with-label";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function EditBlog({ open, handleClose, data }) {
  console.log("------------------- edit data", data);
  const db = getFirestore();
  const storage = getStorage();
  const [uploadStart, setUploadStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileProgress, setFileProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [fileType, setFileType] = useState("");
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDetails(data.details);
      setFileURL(data.fileURL);
      setFileType(data.fileType);
    }
  }, [data]);

  const updateBlogHandler = async () => {
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

      const blogRef = doc(db, "blogs", data?.blogID);
      await updateDoc(blogRef, {
        title: title,
        details: details,
      });
      toast("Updated", { type: "success" });
      setLoading(false);
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

      const storageRef = ref(storage, `blog-files/${data?.fileID}`);
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
            // setFileURL(downloadURL);
            // setFileType(file.type.slice(0, 5));
            const blogRef = doc(db, "blogs", data?.blogID);
            await updateDoc(blogRef, {
              fileType: file.type.slice(0, 5),
              fileURL: downloadURL,
            });
            setUploadStart(false);
          });
        }
      );
    } else {
      toast("File name image required", { type: "error" });
    }
  };
  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose}>
        <DialogTitle>Edit Blog</DialogTitle>
        <Box
          component="form"
          sx={{ "& > :not(style)": { width: "100%" } }}
          noValidate
          autoComplete="off"
          style={{ padding: "20px" }}
        >
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
          {title?.length !== 0 && (
            <p
              style={{
                textAlign: "right",
                marginTop: "15px",
                paddingRight: "30px",
              }}
            >
              {title?.length}
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
          {details?.length !== 0 && (
            <p
              style={{
                textAlign: "right",
                marginTop: "15px",
                paddingRight: "30px",
              }}
            >
              {details?.length}
            </p>
          )}
          <Button
            variant="contained"
            disableElevation
            style={{ marginTop: "15px" }}
            onClick={updateBlogHandler}
          >
            {loading ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
