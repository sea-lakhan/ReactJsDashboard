import { Button, Card, CardActions, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { User } from "./Signup";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { setUserDetails } from "../redux/userSlice";
import { theme } from "../theme/Theme";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 10,
    flexDirection: "row",
  },
  cardStyle: {
    minWidth: 325,
    maxWidth: 325,
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#3caea3",
    backgroundColor: theme.palette.primary.main,
    // justifyContent: "space-between",
  },
  userCardStyle: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  userDetailsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    paddingLeft: 20,
  },
  cardTitle: {
    fontSize: 14,
    color: "#ffffff",
  },

  userCircleIcon: { color: "#ffffff", fontSize: 50 },
  buttonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    padding: 10,
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  deleteIcon: { color: "#ffffff", fontSize: 20 },
  infoButton: { backgroundColor: "#ffffff" },
  chipStyle: { backgroundColor: "#ffffff" },
});

const UserCart = (props: { user: User; deleteUser: any }) => {
  const styles = useStyles();
  let navigation = useHistory();
  const dispatch = useDispatch();

  const handleNavigation = (user: User) => {
    dispatch(setUserDetails(user));
    navigation.push("/userDetails");
  };

  const user = props.user;
  console.log("render");
  return (
    <Grid item>
      <Card className={styles.cardStyle}>
        <div className={styles.root}>
          <div className={styles.userDetailsContainer}>
            <AccountCircleIcon className={styles.userCircleIcon} />
            <div className={styles.userCardStyle}>
              <Typography className={styles.cardTitle}>{user.username}</Typography>
              <Typography className={styles.cardTitle}>{user.name}</Typography>
              <Typography display={"block"} className={styles.cardTitle}>
                {user.email}
              </Typography>
            </div>
          </div>
        </div>
        <CardActions>
          <div className={styles.buttonsContainer}>
            <Button className={styles.infoButton} onClick={() => handleNavigation(user)} variant="contained">
              More Info....
            </Button>
            <Chip className={styles.chipStyle} avatar={<DeleteIcon className={styles.deleteIcon} />} label="Delete" onClick={props.deleteUser} />
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default UserCart;
