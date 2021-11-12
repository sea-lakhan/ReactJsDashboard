import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUserList, setUserDetails } from "../redux/userSlice";

const useStyles = makeStyles({
  rootContainer: {
    display: "flex",
    flex: 2,
    height: "100%",
    padding: 20,
    backgroundColor: "#cc313d",
  },
  root: {
    flexGrow: 1,
    padding: 10,
    flexDirection: "row",
  },
  cardStyle: {
    minWidth: 275,
    display: "flex",
    flexDirection: "column",
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
    alignItems: "center",
    paddingLeft: 20,
  },
  cardTitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  userCircleIcon: { color: "#a7beae", fontSize: 50 },
  buttonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    padding: 10,
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  deleteIcon: { color: "white", fontSize: 20 },
  infoButton: { backgroundColor: "  " },
});

export const UserDashboard = () => {
  const styles = useStyles();
  const navigation = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  //   const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (user.userList.length == 0) {
      axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
        dispatch(addUserList(response.data));
        //   setUserData(response.data);
      });
    }
  }, []);

  const deleteUser = (id: number) => {
    dispatch(addUserList(user.userList.filter((user: any) => user.id != id)));
    // setUserData(userData.filter((user: any) => user.id != id));
  };

  const handleNavigation = (user: any) => {
    dispatch(setUserDetails(user));
    navigation("/UserDetails");
  };
  return (
    <div className={styles.rootContainer}>
      <Grid container className={styles.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={6}>
            {user.userList &&
              user.userList.map((user: any) => (
                <Grid key={user.id} item>
                  <Card className={styles.cardStyle}>
                    <div className={styles.root}>
                      <div className={styles.userDetailsContainer}>
                        <AccountCircleIcon className={styles.userCircleIcon} />
                        <div className={styles.userCardStyle}>
                          <Typography className={styles.cardTitle}>{user.username}</Typography>
                          <Typography className={styles.cardTitle}>{user.name}</Typography>
                          <Typography className={styles.cardTitle}>{user.email}</Typography>
                        </div>
                      </div>
                    </div>
                    <CardActions>
                      <div className={styles.buttonsContainer}>
                        <Button className={styles.infoButton} onClick={() => handleNavigation(user)} variant="contained">
                          More Info....
                        </Button>
                        {/* <Button onClick={() => deleteUser(user.id)}>
                          <DeleteIcon className={styles.deleteIcon} />
                        </Button> */}

                        <Chip avatar={<DeleteIcon className={styles.deleteIcon} />} label="Delete" onClick={() => deleteUser(user.id)} />
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
