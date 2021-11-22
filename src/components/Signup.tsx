import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { addUserList, initialState, setUserDetails } from "../redux/userSlice";
import { StringLiteralLike } from "typescript";
import { RootState } from "../redux/store";
import {
  AlphabetNumericValidation,
  AlphabetValidation,
  AlphaNumericWithUnderscoreValidation,
  EmailValidation,
  PasswordValidation,
} from "../validation";

const useStyle = makeStyles({
  heading: { display: "flex", color: "#898989" },
  textField: { width: "100%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  credentialContainer: { display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" },
  credentialTextFields: { width: "49%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  button: { width: "100%", marginTop: 5, height: "3rem" },
});

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export interface User {
  id?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  website: string;
  phone: string;
  address: Address;
  company: Company;
}

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
  // const [user, setUser] = useState({} as User);
  const styles = useStyle();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  const [credentialViewFlag, setCredentialViewFlag] = useState<boolean>(true);
  const [buttonDisableStatus, setButtonDisableStatus] = useState<boolean>(true);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   switch (e.target.name) {
  //     case "name": {
  //       console.log(AlphabetValidation.test(e.target.value), e.target.name);
  //       setName(e.target.value);
  //       break;
  //     }
  //     case "email": {
  //       console.log(EmailValidation.test(e.target.value), e.target.name);
  //       setEmail(e.target.value);
  //       break;
  //     }
  //     case "username": {
  //       console.log(AlphaNumericWithUnderscoreValidation.test(e.target.value), e.target.name);
  //       setUsername(e.target.value);
  //       break;
  //     }
  //     case "password": {
  //       setPassword(e.target.value);
  //       break;
  //     }
  //     case "confirmPassword": {
  //       setConfirmPassword(e.target.value);
  //       break;
  //     }
  //   }
  // };

  const handleNameChange = (name: string) => {
    setNameError(!AlphabetValidation.test(name));
    setName(name);
  };
  const handleEmailChange = (email: string) => {
    setEmailError(!EmailValidation.test(email));
    setCredentialViewFlag(!EmailValidation.test(email));
    setEmail(email);
  };
  const handleUsernameChange = (username: string) => {
    console.log(AlphaNumericWithUnderscoreValidation.test(username));
    setUsernameError(!AlphaNumericWithUnderscoreValidation.test(username));
    setUsername(username);
  };
  const handlePasswordChange = (password: string) => {
    setPasswordError(!PasswordValidation.test(password));
    setPassword(password);
  };
  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPasswordError(!PasswordValidation.test(confirmPassword));
    setConfirmPassword(confirmPassword);
  };

  useEffect(() => {
    console.log("from first use effect");
    if (userFromRedux.username !== username) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [username]);

  useEffect(() => {
    console.log("from second use effect");
    if (!!userFromRedux.username && !!userFromRedux.name && !!userFromRedux.email && !!userFromRedux.password) {
      handleNameChange(userFromRedux.name);
      handleUsernameChange(userFromRedux.username);
      handleEmailChange(userFromRedux.email);
      handlePasswordChange(userFromRedux.password);
      handleConfirmPasswordChange(userFromRedux.password);
    }
    //  setUser(userFromRedux);
    // setUser({ ...user, website: webmailInitialValue, phone: phoneInitialValue, address: addressInitialValue, company: companyInitialValue });
  }, []);

  useEffect(() => {
    console.log("called third use effect");
    if (!nameError && !emailError && !usernameError && !passwordError && !confirmPasswordError) {
      setButtonDisableStatus(false);
    } else {
      setButtonDisableStatus(true);
    }
  });

  const handleClick = () => {
    if (name && email && username && password && confirmPassword) {
      dispatch(
        setUserDetails({
          name: name,
          username: username,
          email: email,
          password: password,
          website: webmailInitialValue,
          phone: phoneInitialValue,
          address: addressInitialValue,
          company: companyInitialValue,
        })
      );
      navigation("/confirmDetails");
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <div className="container">
      <div className="signupContainer">
        <div className="formfields">
          <h1 className={styles.heading}>Sign Up</h1>
          <TextField
            error={nameError}
            value={name}
            name="name"
            className={styles.textField}
            onChange={(e) => handleNameChange(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required
          />
          <TextField
            error={emailError}
            value={email}
            name="email"
            className={styles.textField}
            onChange={(e) => handleEmailChange(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
          />
          <TextField
            error={usernameError}
            value={username}
            disabled={credentialViewFlag}
            name="username"
            className={styles.textField}
            onChange={(e) => handleUsernameChange(e.target.value)}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            required={credentialViewFlag}
          />
          <div className={styles.credentialContainer}>
            <TextField
              error={passwordError}
              value={password}
              disabled={credentialViewFlag}
              name="password"
              type="password"
              className={styles.credentialTextFields}
              onChange={(e) => handlePasswordChange(e.target.value)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required={credentialViewFlag}
            />
            <TextField
              error={confirmPasswordError}
              value={confirmPassword}
              disabled={credentialViewFlag}
              name="confirmPassword"
              type="password"
              className={styles.credentialTextFields}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              required={credentialViewFlag}
            />
          </div>
          {/* <Link style={{ width:"100%", marginTop:10,height:"3rem", font}} to={{pathname:'/details'}}> */}
          <Button disabled={buttonDisableStatus} onClick={handleClick} className={styles.button} variant="contained" color="primary">
            Submit
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
