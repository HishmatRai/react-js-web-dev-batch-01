import React from "react";
import IHunarImage from "./img.jpg";
import Image223 from "./images.jfif";
import Home from './home'
import About from "./about";
import './App.css'
const  App =()=> {
  return (
    <div>
      <Home />
      <About />
      <About />
      <About />
      <About />
      {/* <h1 className="heading">Main Page</h1>
      <h1 style={{color:"red"}}>Main Page</h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s" />
      <img src={IHunarImage} height="150" width="52" />
      <img src={Image223} style={{ height: "45px", with: "100px" }} /> */}
      {/* <img src={Image223} style="height:46px" /> */}
      {/* <input type="text" placeholder="Type ..."  /> */}
    </div>
  );
}
export default App;
