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
export default function EditBlog({ open, handleClose, data }) {
  console.log("------------------- edit data", data);
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
          title: title,
          details: details,
          fileType: fileType,
        };
        // const docRef = await addDoc(collection(db, "blogs"), newBlog);
        // const blogRef = doc(db, "blogs", docRef.id);
        // await updateDoc(blogRef, {
        //   blogID: docRef.id,
        // });
        // toast("New blog created", { type: "success" });
        // setLoading(false);
        // window.location.reload();
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
            // onChange={(e) => uploadBlogFile(e)}
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
            // onClick={createBlogHandler}
          >
            {loading ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Create"
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
