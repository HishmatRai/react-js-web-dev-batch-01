import React, { useState } from "react";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import "./App.css";
const App = () => {
  const [colorName, setColorName] = React.useState("red");
  const [username, setUserName] = useState("abc");
  const [activePage, setActivePage] = useState("Home");
  // const pagesList = ["Home", "About", "Contact", "Login", "Fsd"];
  const pagesList = [
    {
      title: "Home",
      page: <Home />,
    },
    {
      title: "About",
      page: <About />,
    },
    {
      title: "Contact",
      page: <Contact />,
    },
  ];
  function changeColorHandler() {
    setColorName("green");
  }
  return (
    <div>
      {/* <p style={{ color: colorName }}>Color Name :- {colorName}</p>
      <button onClick={() => setColorName("blue")}>Change Color</button>
      <button onClick={() => changeColorHandler()}>Change Color 2</button>
      <p>Username :- {username}</p>
      <button onClick={() => setUserName("xyz")}>Change Username</button>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      /> */}
      {/* <button
        className={activePage === "home" ? "active" : "pages"}
        style={{ backgroundColor: activePage === "home" ? "red" : "blue" }}
        onClick={() => setActivePage("home")}
      >
        Home
      </button>
      <button
        className={activePage === "about" ? "active" : "pages"}
        style={{ backgroundColor: activePage === "about" ? "red" : "blue" }}
        onClick={() => setActivePage("about")}
      >
        About
      </button>
      <button
        className={activePage === "contact" ? "active" : "pages"}
        style={{ backgroundColor: activePage === "contact" ? "red" : "blue" }}
        onClick={() => setActivePage("contact")}
      >
        Contact
      </button>
      <button
        className={activePage === "login" ? "active" : "pages"}
        style={{ backgroundColor: activePage === "login" ? "red" : "blue" }}
        onClick={() => setActivePage("login")}
      >
        Login
      </button> */}

      {pagesList.map((value, index) => {
        return (
          <button
            key={index}
            className={activePage === value.title ? "active" : "pages"}
            style={{
              backgroundColor: activePage === value.title ? "red" : "blue",
            }}
            onClick={() => setActivePage(value.title)}
          >
            {value.title}
          </button>
        );
      })}
      {/* {activePage === "Home" ? (
        <Home />
      ) : activePage === "About" ? (
        <About />
      ) : activePage === "Contact" ? (
        <h1>Contact Page</h1>
      ) : activePage === "Login" ? (
        <h1>Login Page</h1>
      ) : (
        <h1>Page Not Found!</h1>
      )} */}

      {pagesList.map((value, index) => {
        return (
          <div key={index}>{activePage === value.title && value.page}</div>
        );
      })}
    </div>
  );
};
export default App;
