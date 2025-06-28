import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import moment from "moment";
import ReactPlayer from "react-player";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "../basic-modal";
import TextField from "@mui/material/TextField";
import CommentList from "../comment-section";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { doc, onSnapshot, getFirestore, updateDoc } from "firebase/firestore";
import "./index.css";
const language = "en";
function Media(props) {
  const navigate = useNavigate();
  const { loading, data, uid, likeHandler } = props;
  const isLiked = data?.likes?.includes(uid);
  return (
    <Card>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt={data?.name} src={data?.profileURL} />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            data?.name
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            moment(data?.createdAt).fromNow()
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 500 }} animation="wave" variant="rectangular" />
      ) : (
        <div>
          {data?.fileType === "image" ? (
            <CardMedia component="img" height="500" image={data?.fileURL} />
          ) : (
            <ReactPlayer
              style={{
                borderRadius: "5px",
              }}
              width={"100%"}
              height={"500px"}
              controls={true}
              url={data?.fileURL}
            />
          )}
        </div>
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" component="p" className="title-2">
            {data?.title}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "text.secondary" }}
          >
            {data?.details}
          </Typography>
        )}
      </CardContent>
      <div className="card-footer">
        <CardContent style={{ paddingTop: "0px", paddingBottom: "10px" }}>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={50} width={150} />
            </React.Fragment>
          ) : (
            <div className="footer-box">
              <Button
                variant="contained"
                disableElevation
                className="like-btn"
                onClick={likeHandler}
              >
                {isLiked ? (
                  <ThumbUpIcon style={{ color: "#1976d2" }} />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}

                <p>
                  {Intl.NumberFormat(language, { notation: "compact" }).format(
                    data?.likes?.length
                  )}
                </p>
              </Button>
            </div>
          )}
        </CardContent>
        <CardContent style={{ paddingTop: "0px", paddingBottom: "10px" }}>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={50} width={150} />
            </React.Fragment>
          ) : (
            <div className="footer-box">
              <CommentOutlinedIcon />
              <p>
                {Intl.NumberFormat(language, { notation: "compact" }).format(
                  data?.comments?.length
                )}
              </p>
            </div>
          )}
        </CardContent>
        <CardContent style={{ paddingTop: "0px", paddingBottom: "10px" }}>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={50} width={150} />
            </React.Fragment>
          ) : (
            <div className="footer-box">
              <ShareOutlinedIcon />
              <p>
                {Intl.NumberFormat(language, { notation: "compact" }).format(
                  data?.share
                )}
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function CardDetails({ data, loading, path }) {
  const auth = getAuth();
  const db = getFirestore();
  const [uid, setUid] = useState(null);
  const [alredyLogin, setAlradyLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState({});
  const [commentRes, setCommentRes] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setAlradyLogin(true);
        // user
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUser({ ...doc.data() });
        });
      } else {
        setUid(null);
        setAlradyLogin(false);
        setUser({});
      }
    });
  }, []);
  // likeHandler
  const likeHandler = async () => {
    if (alredyLogin) {
      let likes = data?.likes;
      const isLiked = likes?.includes(uid);
      if (isLiked) {
        // remove
        for (let index in likes) {
          if (likes[index] === uid) {
            likes.splice(index, 1);
            break;
          }
        }
      } else {
        // add
        likes.push(uid);
      }
      // update data
      const blogRef = doc(db, "blogs", data.blogID);
      await updateDoc(blogRef, {
        likes: likes,
      });
    } else {
      setModalOpen(true);
    }
  };
  // share
  const shareHandler = async () => {
    let share = data?.share;
    share += 1;
    const blogRef = doc(db, "blogs", data?.blogID);
    await updateDoc(blogRef, {
      share: share,
    });
  };

  // comment
  const commentHandler = async () => {
    if (alredyLogin) {
      setCommentRes(true);
      let comments = data?.comments;
      comments.push({
        commentText: commentText,
        createdAt: moment().format(),
        uid: uid,
      });
      const blogRef = doc(db, "blogs", data?.blogID);
      await updateDoc(blogRef, {
        comments: comments,
      })
        .then(() => {
          setCommentRes(false);
          setCommentText("");
        })
        .catch(() => {
          setCommentRes(false);
        });
    } else {
      setModalOpen(true);
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} style={{ padding: "20px" }}>
        <Media
          loading={loading}
          data={data}
          uid={uid}
          likeHandler={likeHandler}
        />
        <br />
        <br />
        <FacebookShareButton
          url={`https://react-js-web-dev-batch-01.vercel.app/blog-details/${path}`}
          onClick={shareHandler}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>{" "}
        <TwitterShareButton
          url={`https://react-js-web-dev-batch-01.vercel.app/blog-details/${path}`}
          onClick={shareHandler}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>{" "}
        <WhatsappShareButton
          url={`https://react-js-web-dev-batch-01.vercel.app/blog-details/${path}`}
          onClick={shareHandler}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <br />
        <br />
        <p>
          URL : https://react-js-web-dev-batch-01.vercel.app/blog-details/{path}
        </p>
        <br />
        <h1 style={{ marginBottom: "20px" }}>
          {data?.comments?.length} Comments
        </h1>
        <Grid container spacing={2}>
          <Grid size={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
            <Avatar
              alt={user?.name}
              src={user?.profileURL}
              style={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid size={{ xl: 11, lg: 11, md: 11, sm: 11, xs: 11 }}>
            <TextField
              id="outlined-textarea"
              label="Add a comment ..."
              placeholder="Add a comment ..."
              multiline
              style={{ marginTop: "15px", width: "100%" }}
              rows={7}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Grid>
        </Grid>
        <div className="comment-footer">
          <Button
            variant="contained"
            onClick={commentHandler}
            disabled={commentText === "" ? true : false}
          >
            {commentRes ? (
              <CircularProgress style={{ color: "white" }} size={20} />
            ) : (
              "Comment"
            )}
          </Button>
        </div>
        <CommentList data={data?.comments} />
        <BasicModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      </Box>
    </div>
  );
}
