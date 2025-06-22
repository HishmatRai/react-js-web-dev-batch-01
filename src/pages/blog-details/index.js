import React, { useEffect, useState } from "react";
import { Navbar, CardDetails} from "../../components";
import { onSnapshot, getFirestore, getDoc, doc } from "firebase/firestore";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
const BlogDetails = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const routerLocation = useLocation();
  const path = routerLocation.pathname.slice(14);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "blogs", path), async (blogRes) => {
      if (blogRes.data()) {
        const userRef = doc(db, "users", blogRes.data().userID);
        const userSnap = await getDoc(userRef);
        setBlog({ ...blogRes.data(), ...userSnap.data() });
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/");
      }
    });
  }, []);
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
        <div>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </div>
        <CardDetails loading={loading} data={blog} />
      </Box>
    </div>
  );
};
export default BlogDetails;
