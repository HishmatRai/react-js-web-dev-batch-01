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
import moment from "moment";
import ReactPlayer from "react-player";
import "./index.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";
const language = "en";
function Media(props) {
  const navigate = useNavigate();
  const { loading, data, uid, edit } = props;
  console.log("-------------------edit", edit);
  const isLiked = data?.likes?.includes(uid);
  return (
    <Card
      className="card"
      onClick={() =>
        !loading &&
        navigate(`/blog-details/${data?.blogID}`, { state: { edit: edit } })
      }
      // onClick={() => !loading && navigate('/')}
      // onClick={() => alert("Fdf")}
    >
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
            <Avatar alt={data.name} src={data.profileURL} />
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
            data.name
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            moment(data.createdAt).fromNow()
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      ) : (
        <div>
          {data.fileType === "image" ? (
            <CardMedia component="img" height="200" image={data.fileURL} />
          ) : (
            <ReactPlayer
              style={{
                borderRadius: "5px",
              }}
              width={"100%"}
              height={"200px"}
              controls={true}
              url={data.fileURL}
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
          <Typography variant="body2" component="p" className="title">
            {data.title}
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
            className="details"
          >
            {data?.details}
          </Typography>
        )}
      </CardContent>
      <div className="card-footer">
        <CardContent style={{ paddingTop: "0px", paddingBottom: "10px" }}>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={50} width={50} />
            </React.Fragment>
          ) : (
            <div className="footer-box">
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
            </div>
          )}
        </CardContent>
        <CardContent style={{ paddingTop: "0px", paddingBottom: "10px" }}>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={50} width={50} />
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
              <Skeleton animation="wave" height={50} width={50} />
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

export default function CardCom({ data, loading, edit }) {
  const auth = getAuth();
  const [uid, setUid] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {(loading ? Array.from(new Array(18)) : data).map((item, index) => (
            <Grid size={{ xl: 2, lg: 3, md: 4, sm: 6, xs: 12 }} key={index}>
              <Media loading={loading} data={item} uid={uid} edit={edit} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
