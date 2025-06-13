import React from "react";
import { Navbar, Footer, Layout } from "../../components";
import FacebookIcon from '@mui/icons-material/Facebook';
import { MdFacebook } from "react-icons/md";

const Contact = () => {
  return (
    <Layout>
      {/* <Navbar activePage="Contact" />     */}
      <h1>Contact Page</h1>
      <hr />
      <FacebookIcon style={{width:"150px",height:"150px",color:"blue"}}/>
      <MdFacebook size={50} color="green" />
      {/* <Footer /> */}
    </Layout>
  );
};
export default Contact;
