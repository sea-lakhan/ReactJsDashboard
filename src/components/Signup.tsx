import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { addUserList, initialState, setUserDetails } from "../redux/userSlice";
import { StringLiteralLike } from "typescript";
import { RootState } from "../redux/store";

const useStyle = makeStyles({
  heading: { display: "flex", color: "#898989" },
  textField: { width: "100%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  credentialContainer: { display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" },
  credentialTextFields: { width: "49%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  button: { width: "100%", marginTop: 5, height: "3rem" },
});

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  name: string;
  email: string;
  username: string;
  password: string;
  website: string;
  phone: string;
  address: Address;
  company: Company;
};

const webmailInitialValue = "www.e-zest.com";
const phoneInitialValue = "123-123-1234";
const addressInitialValue = {
  street: "Sr. No.: 365",
  suite: "Netram Apt.",
  city: "Pune",
  zipcode: 411037,
};
const companyInitialValue = {
  name: "E-zest",
  catchPhrase: "Multi-layered client-server neural-net",
  bs: "real-time e-markets",
};

export const Signup = () => {
  const userFromRedux = useSelector<RootState, User | any>((state: RootState) => state.user.selectedUser);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [user, setUser] = useState({} as User);
  const styles = useStyle();
  // const[name, setName]=useState('');
  // const[email, setEmail]=useState('');
  // const[username, setUsername]=useState('');
  // const[password, setPassword]=useState('');

  const handleChange = (value: string, type: string) => {
    switch (type) {
      case "name":
        // setName(value)
        setUser({ ...user, name: value });
        break;
      case "email":
        // setEmail(value)
        setUser({ ...user, email: value });
        break;
      case "username":
        // setUsername(value)
        setUser({ ...user, username: value });
        break;
      case "password":
        // setPassword(value)
        setUser({ ...user, password: value });
        break;
    }
  };

  useEffect(() => {
    setUser({ ...user, password: "" });
  }, [user.username]);

  useEffect(() => {
    if (!!userFromRedux.username && !!userFromRedux.name && !!userFromRedux.email && !!userFromRedux.password) setUser(userFromRedux);
    else setUser({ ...user, website: webmailInitialValue, phone: phoneInitialValue, address: addressInitialValue, company: companyInitialValue });
  }, []);

  const handleClick = () => {
    if (user.name && user.email && user.username && user.password) {
      dispatch(setUserDetails(user));
      navigation("/confirmDetails");
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <div className="signupContainer">
      <div className="formfields">
        <h1 className={styles.heading}>Sign Up</h1>
        <TextField
          value={user.name}
          className={styles.textField}
          onChange={(e) => handleChange(e.target.value, "name")}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          value={user.email}
          className={styles.textField}
          onChange={(e) => handleChange(e.target.value, "email")}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <div className={styles.credentialContainer}>
          <TextField
            value={user.username}
            className={styles.credentialTextFields}
            onChange={(e) => handleChange(e.target.value, "username")}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            value={user.password}
            type="password"
            className={styles.credentialTextFields}
            onChange={(e) => handleChange(e.target.value, "password")}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
        {/* <Link style={{ width:"100%", marginTop:10,height:"3rem", font}} to={{pathname:'/details'}}> */}
        <Button onClick={handleClick} className={styles.button} variant="contained" color="primary">
          Submit
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};
