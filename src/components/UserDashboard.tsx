import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUserList, setUserDetails } from "../redux/userSlice";
import { User } from "./Signup";
import { RootState } from "../redux/store";
import UserCart from "./UserCart";

const useStyles = makeStyles({
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
});

export const UserDashboard = () => {
  const styles = useStyles();
  let navigation = useHistory();
  const user = useSelector<RootState, { userList: User[]; selectedUser: User }>((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(" http://localhost:3006/users")
      .then((response) => {
        dispatch(addUserList(response.data));
        //   setUserData(response.data);
      })
      .catch((error) => console.error());
  };

  const removeUser = async (id: number) => {
    await axios
      .delete(`http://localhost:3006/users/${id}`)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
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

  // const handleNavigation = (user: User) => {
  //   dispatch(setUserDetails(user));
  //   navigation.push("/userDetails");
  // };

  return (
    <div className="container">
      <div className={styles.rootContainer}>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={6}>
              {user.userList &&
                user.userList.map((user: User) => <UserCart key={Number(user.id)} user={user} deleteUser={() => deleteUser(Number(user.id))} />)}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
