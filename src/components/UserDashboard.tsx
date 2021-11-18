import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUserList, setUserDetails } from "../redux/userSlice";
import { User } from "./Signup";
import { RootState } from "../redux/store";

const useStyles = makeStyles({
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  rootContainer: {
    display: "flex",
    flex: 2,
    height: "100%",
    padding: 20,
    // backgroundColor: "#cc313d",
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
    backgroundColor: "#cc313d",
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
  pos: {
    marginBottom: 12,
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

export const UserDashboard = () => {
  const styles = useStyles();
  const navigation = useNavigate();
  const user = useSelector<RootState, { userList: User[]; selectedUser: User }>((state: any) => state.user);
  const dispatch = useDispatch();
  //   const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get(" http://localhost:3006/users")
      .then((response) => {
        dispatch(addUserList(response.data));
        //   setUserData(response.data);
      })
      .catch((error) => console.error());
  }, []);

  const removeUser = async (id: number) => {
    await axios
      .delete(`http://localhost:3006/users/${id}`)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          alert("User deleted successfully.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  // const updateUser = async (user: any) => {
  //   const response = await axios.put(`http://localhost:3006/users/${user.id}`, user);
  // };

  const deleteUser = async (id: number) => {
    await removeUser(id);
    dispatch(addUserList(user.userList.filter((user: any) => user.id !== id)));
  };

  const handleNavigation = (user: User) => {
    dispatch(setUserDetails(user));
    navigation("/userDetails");
  };

  return (
    <div className="container">
      <div className={styles.rootContainer}>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={6}>
              {user.userList &&
                user.userList.map((user: User) => (
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

                          <Chip
                            className={styles.chipStyle}
                            avatar={<DeleteIcon className={styles.deleteIcon} />}
                            label="Delete"
                            onClick={() => deleteUser(Number(user.id))}
                          />
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
