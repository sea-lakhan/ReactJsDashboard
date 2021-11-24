import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
// import { selectUser } from "../redux_stuff/userSlicer";
import { useDispatch, useSelector } from "react-redux";
// import { removeUser } from "../redux_stuff/userSlicer";
import { makeStyles } from "@material-ui/core";
import { RootState } from "../redux/store";
import axios from "axios";
import { User } from "./Signup";
import { resetSelectedUser } from "../redux/userSlice";

const useStyle = makeStyles({
  heading: { display: "flex", color: "#3caea3", marginBottom: 5 },
  button: { width: "100%", marginTop: 5, height: "3rem", backgroundColor: "#3caea3", color: "#fff" },
});

export const Details = (props: any) => {
  const user = useSelector<RootState, User>((state: any) => state.user.selectedUser);
  const dispatch = useDispatch();
  const navigation = useHistory();
  const styles = useStyle();

  const handleClick = async () => {
    // const response =
    await axios
      .post("http://localhost:3006/users", user)
      .then((response) => {
        dispatch(resetSelectedUser());
      })
      .catch((error) => alert(error));
    navigation.go(-2);
  };

  const handleBackClick = () => {
    // navigation("/addUser");
    navigation.goBack();
  };

  return (
    <div className="container">
      <div className="signupContainer">
        <div className="detailsContainer">
          <h2 className={styles.heading}>User Details</h2>
          <h3>Name:{user.name}</h3>
          <h3>Email:{user.email}</h3>
          <h3>Username:{user.username}</h3>
          <Button className={styles.button} onClick={handleBackClick} variant="contained" color="primary">
            Back
          </Button>
          <Button className={styles.button} onClick={handleClick} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
