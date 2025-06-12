import React from "react";
import { Navbar, Button, Footer, Layout } from "../../components";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Home = () => {
  const navigate = useNavigate();
  // const loginHandler = () => {
  //   alert("log in function");
  // };
  const news = [
    {
      title:
        "Bilawal says India's actions pushed region to brink of 'all-out war'",
      url: "https://www.thenews.com.pk/assets/uploads/updates/2025-06-12/1320346_3638214_bilawal-to_updates.jpg",
      text: "Pakistan’s former foreign minister Bilawal Bhutto-Zardari has warned US lawmakers and diplomats that the risk of a full-scale war with India is now greater than ever, as according to him, recent actions by India had “dangerously lowered the threshold” for an armed conflict in the region. Bilawal went on to say that the region was not as safe as it used to be before because of India's unilateral measures. “We’re all a lot less safe as a result of this conflict than we were before,” said the young PPP chief.",
    },
    {
      title:
        "Without legislation, tax steps of up to Rs500bn would be needed: Aurangzeb",
      url: "https://www.thenews.com.pk/assets/uploads/akhbar/2025-06-12/1320322_5771187_Aurang_akhbar.jpg",
      text: "During the post-budget press conference, the minister hinted at introducing a mini-budget for the fiscal year 2025-26, noting that all budgetary figures had been “locked with the IMF.” He emphasized that this was the first time the International Monetary Fund (IMF) staff had accepted generating Rs400 billion through enforcement measures.",
    },
    {
      title:
        "Trump hails Marines deployment in LA as California readies legal battle",
      url: "https://www.thenews.com.pk/assets/uploads/updates/2025-06-12/1320516_7938509_Marines-in-LA_updates.jpg",
      text: "US President Donald Trump said Thursday that Los Angeles was safe and sound for the past two nights, crediting his deployment of thousands of troops to quell anti-deportation protests, as California prepared for a legal showdown over his unprecedented move. The mostly peaceful protests ignited last week over an escalation in efforts to apprehend migrants in the country illegally, but there were also pockets of violence, including the burning of self-driving taxis and the hurling of stones at police.",
    },
  ];
  return (
    <Layout activePage="Home">
      {/* <Navbar activePage="Home" /> */}
      <h1>Home Page</h1>
      <div className="card-container">
        {news.map((val, index) => {
          return (
            <div key={index}>
              <p className="title">Title :{val.title} </p>
              <img src={val.url} />
              <p className="details">Details :- {val.text} </p>
              <button
                onClick={() =>
                  navigate(`/news-details/${val.text}`, { state: { data: val } })
                }
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
      {/* <hr />
      <Button title="Log In" onClick={loginHandler} />
      <Button
        title="Sign Up"
        borderRadius={true}
        onClick={() => console.log("sign up")}
      />
      <Button title="Update" color="blue" />
      <Button title="Edit" borderRadius={true} />
      <Button title="Log Out" />
      <Button title="Delete" color="yellow" /> */}
      {/* <Button /> */}
    </Layout>
  );
};
export default Home;
