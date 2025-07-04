import React, { useEffect, useState } from "react";
import { Navbar, Card } from "../../components";
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  getDoc,
  doc,
  where
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Dashboard = () => {
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {

             const q = query(collection(db, "blogs"), where("userID", "==", user.uid));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const newBlogs = [];
                const fetchData = async () => {
                  for (const blogRes of querySnapshot.docs) {
                    const blogData = blogRes.data();
                    const userRef = doc(db, "users", blogData.userID);
                    const UserSnap = await getDoc(userRef);
                    const userData = UserSnap.data();
                    newBlogs.push({ ...blogData, ...userData });
                  }
                  setBlogs([...newBlogs]);
                  setLoading(false);
                };
          
                fetchData();
              });
        } else {
          navigate("/email-verification");
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  const filteredData = blogs
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //
  console.log(filteredData);

  //output - "234K"
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
        <TextField
          id="outlined-basic"
          label="Search"
          type="search"
          variant="outlined"
          style={{ marginTop: "15px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {loading ? (
        <Card data={filteredData} loading={loading} />
      ) : filteredData.length === 0 ? (
        <Box
          component="form"
          sx={{ "& > :not(style)": { width: "100%" } }}
          noValidate
          autoComplete="off"
          style={{ padding: "20px" }}
        >
          <h1>Data Not Found!</h1>
        </Box>
      ) : (
        <Card data={filteredData} loading={loading} edit={true}/>
      )}
    </div>
  );
};
export default Dashboard;
