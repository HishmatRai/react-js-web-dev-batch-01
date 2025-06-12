import React from "react";
import { Layout } from "../../components";
import { useLocation } from "react-router-dom";
const NewsDetails = () => {
  const routerLocation = useLocation();
  const stateData = routerLocation.state.data;
  return (
    <Layout>
      <h1>News Details Page</h1>
      <p >Title :{stateData.title} </p>
      <img src={stateData.url} />
      <p >Details :- {stateData.text} </p>
    </Layout>
  );
};
export default NewsDetails;
