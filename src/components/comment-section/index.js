import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function CommentList({ data }) {
  const db = getFirestore();
  //   const [comments, setComments] = useState([data]);
  //   useEffect(() => {
  //     setComments([...data]);
  //   }, []);
  //   console.log("comments-----------------",comments)
  let sortComments = data?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  let commetsData = [];
  const fetchData = async () => {
    for (let index in sortComments) {
      const userRef = doc(db, "users", sortComments[index].uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        commetsData.push({
          ...sortComments[index],
          ...userSnap.data(),
        });
      }
    }

    console.log("commetsData", commetsData);
  };

  fetchData();
  console.log("commetsData", commetsData);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {sortComments?.map((val, index) => {
        return (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Name "
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    ></Typography>
                    {moment(val?.createdAt).fromNow()}
                    <br />
                    {val?.commentText}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
