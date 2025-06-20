import React, { useEffect, useState } from "react";
import { Navbar, Card } from "../../components";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";

const Home = () => {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "blogs"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newBlogs = [];
      querySnapshot.forEach((doc) => {
        newBlogs.push(doc.data());
      });
      setBlogs([...newBlogs]);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Card data={blogs} loading={loading} />
    </div>
  );
};
export default Home;
