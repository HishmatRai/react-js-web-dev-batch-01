import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
const Navbar = (props) => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const PagesList = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About Us",
      path: "/about-us",
    },
    {
      title: "Contact Us",
      path: "/contact-us",
    },
    {
      title: "Login",
      path: "/login",
    },
  ];
  return (
    <div>
      {/* <a href="/">Home</a>
      <a href="/about-us">About</a>
      <a href="/contact-us">Contact</a>
      <a href="/login">Login</a>
      <hr />
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/contact-us">Contact</Link>
      <Link to="/login">Login</Link>
      <hr />
      <button onClick={() => window.location.assign("/")}>Home</button>
      <button onClick={() => window.location.assign("/about-us")}>About</button>
      <button onClick={() => window.location.assign("/contact-us")}>
        Contact
      </button>
      <button onClick={() => window.location.assign("/login")}>Login</button>
      <hr /> */}
      {/* <button className="active-nav" onClick={() => navigate("/")}>
        Home
      </button>
      <button onClick={() => navigate("/about-us")}>About</button>
      <button onClick={() => navigate("/contact-us")}>Contact</button>
      <button onClick={() => navigate("/login")}>Login</button> */}

      {PagesList.map((value, index) => {
        return (
          <button
            className={
              value.path === routerLocation.pathname ? "active-nav" : "nav"
            }
            key={index}
            onClick={() => navigate(value.path)}
          >
            {value.title}
          </button>
        );
      })}
      <span>Acitve Page : - {props.activePage}</span>
    </div>
  );
};
export default Navbar;
