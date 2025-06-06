import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <a href="/">Home</a>
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
      <hr />
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/about-us")}>About</button>
      <button onClick={() => navigate("/contact-us")}>Contact</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};
export default Navbar;
