import { useEffect, useState } from "react";
import TextFields from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AlphaNumericWithUnderscoreValidation, PasswordValidation } from "../validation";
import { theme } from "../theme/Theme";

import { User } from "./Signup";
import { setLoggedInState } from "../redux/userSlice";
import axios from "axios";

const useStyle = makeStyles({
  heading: { display: "flex", color: theme.palette.primary.main },
  textField: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
  credentialContainer: { display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start" },
  credentialTextFields: { width: "49%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  button: { width: "100%", marginTop: 5, height: "3rem", backgroundColor: "#3caea3", color: "#fff" },
  errorMessage: { color: "#ff3300" },
  dateContainer: { width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: 10 },
  clearDateIcon: { marginRight: 10 },
  notInThisMonthDay: {
    width: "35px",
    height: "35px",
    backgroundColor: theme.palette.secondary.main,
    margin: "1px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  futureDay: {
    width: "35px",
    height: "35px",
    backgroundColor: theme.palette.primary.light,
    margin: "1px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    // cursor: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  normalDay: {
    width: "35px",
    height: "35px",
    backgroundColor: theme.palette.primary.dark,
    margin: "1px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  selectedDay: {
    width: "35px",
    height: "35px",
    backgroundColor: "#ffffff",
    margin: "1px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
  },
  today: {
    width: "35px",
    height: "35px",
    backgroundColor: theme.palette.primary.dark,
    margin: "1px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigation = useHistory();

  const styles = useStyle();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonDisableStatus, setButtonDisableStatus] = useState<boolean>(true);

  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleUsernameChange = (username: string) => {
    setUsernameError(!AlphaNumericWithUnderscoreValidation.test(username));
    setUsername(username);
  };
  const handlePasswordChange = (password: string) => {
    setPasswordError(!PasswordValidation.test(password));
    setPassword(password);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (!!username && !usernameError && !!password && !passwordError) {
      setButtonDisableStatus(false);
    } else {
      setButtonDisableStatus(true);
    }
  });

  const getUserDetails = () => {
    axios
      //   .get(`http://localhost:3006/users?username:${username}&password=${password}`)
      .post(`http://localhost:5000/api/users/login`, { username, password })
      .then((response) => {
        if (response.data.length !== 0 && response.status === 200) {
          dispatch(setLoggedInState());
          navigation.push("/dashboard");
        } else if (response.status === 401) {
          alert("User not found.");
        }
      })
      .catch((error) => console.error());
  };

  const handleClick = () => {
    if (username && password) {
      getUserDetails();
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <div className="container">
      <div className="signupContainer">
        <div className="formfields">
          <h1 className={styles.heading}>Login</h1>

          <TextFields
            error={usernameError}
            value={username}
            name="username"
            className={styles.textField}
            onChange={(e) => handleUsernameChange(e.target.value)}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            required
            helperText={usernameError ? "Please enter only alphanumeric value" : ""}
          />
          <TextFields
            error={passwordError}
            value={password}
            name="password"
            type="password"
            className={styles.textField}
            onChange={(e) => handlePasswordChange(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            helperText={
              passwordError ? "Password must have 1 capital letter, 1 small letter, 1 digit, special character and 7 to 15 letters long" : ""
            }
          />
          <Button disabled={buttonDisableStatus} onClick={handleClick} className={styles.button} variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
