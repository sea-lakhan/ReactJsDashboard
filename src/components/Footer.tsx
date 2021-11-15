import React from "react";
import { Container, Grid, Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  linkStyle: {
    margin: "1rem",
    textDecoration: "none",
    color: "white",
  },
});
export const Footer = () => {
  const styles = useStyle();
  return (
    <footer>
      <Box bgcolor="text.secondary" color="white">
        <Container maxWidth={"lg"}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link to="/userDashboard" className={styles.linkStyle}>
                  Dashboard
                </Link>
              </Box>
              <Box>
                <Link to="/" className={styles.linkStyle}>
                  Signup
                </Link>
              </Box>
              <Box>
                <Link to="/" className={styles.linkStyle}>
                  Add User
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link to="/" className={styles.linkStyle}>
                  Help
                </Link>
              </Box>
              <Box>
                <Link to="/" className={styles.linkStyle}>
                  Contact
                </Link>
              </Box>
              <Box>
                <Link to="/" className={styles.linkStyle}>
                  About
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};
