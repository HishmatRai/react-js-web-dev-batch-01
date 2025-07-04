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
  // console.log("------------data----------------", data);
  const db = getFirestore();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const commentsData = [];

      for (let item of data) {
        try {
          const userRef = doc(db, "users", item.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            commentsData.push({
              ...item,
              ...userSnap.data(),
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      setComments(commentsData); // ✅ Update state
    };

    if (data && data.length > 0) {
      fetchData();
    }
  }, [data]);


  console.log("------------commentsddsds----------------", comments);

  let sortComments = comments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {sortComments?.map((val, index) => {
        return (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={val?.name} src={val?.profileURL} />
              </ListItemAvatar>
              <ListItemText
                primary={val?.name}
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
