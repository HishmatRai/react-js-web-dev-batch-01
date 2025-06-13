import React from "react";
import { Card, Layout } from "../../components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const About = () => {
  return (
    <Layout activePage="About">
      <h1>About Page</h1>
      <hr />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, index) => {
            return (
              <Grid key={index} size={{ xl: 2, lg: 3, md: 4, sm: 6, xs: 12 }}>
                <Card />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
};
export default About;
