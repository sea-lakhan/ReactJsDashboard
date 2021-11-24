import { useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton, InputAdornment } from "@material-ui/core";
import { setUserDetails } from "../redux/userSlice";

import { RootState } from "../redux/store";
import { AlphabetValidation, AlphaNumericWithUnderscoreValidation, EmailValidation, PasswordValidation } from "../validation";

const useStyle = makeStyles({
  heading: { display: "flex", color: "#3caea3" },
  textField: { width: "100%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  credentialContainer: { display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start" },
  credentialTextFields: { width: "49%", backgroundColor: "#ffffff", borderRadius: 10, marginTop: 10 },
  button: { width: "100%", marginTop: 5, height: "3rem", backgroundColor: "#3caea3", color: "#fff" },
  errorMessage: { color: "#ff3300" },
  dateContainer: { width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: 10 },
  clearDateIcon: { marginRight: 10 },
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
  dob: string;
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
  const navigation = useHistory();
  const addressInputRef = useRef();
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
  const [address, setAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<boolean>(false);
  const [rowSize, setRowSize] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dateError, setDateError] = useState<boolean>(false);
  const [dateState, setDateState] = useState<boolean>(false);

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
    console.log(password, confirmPassword);
    setPasswordError(!PasswordValidation.test(password));
    setPassword(password);
  };
  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  };

  const handleAddressChange = (address: string) => {
    setAddressError(!address);
    setAddress(address);
  };

  const handleDateChange = (date: any | null) => {
    console.log(date);
    if (date === null || date === undefined || date.isValid()) {
      setDateError(false);
    } else if (!date.isValid()) {
      setDateError(true);
    }
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log("from first use effect");
    if (userFromRedux.username !== username) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [username]);

  useEffect(() => {
    setConfirmPasswordError(!(password.length === confirmPassword.length ? password === confirmPassword : password.startsWith(confirmPassword)));
  }, [password, confirmPassword]);

  useEffect(() => {
    console.log("from second use effect");
    if (!!userFromRedux.username && !!userFromRedux.name && !!userFromRedux.email && !!userFromRedux.password) {
      handleNameChange(userFromRedux.name);
      handleUsernameChange(userFromRedux.username);
      handleEmailChange(userFromRedux.email);
      handlePasswordChange(userFromRedux.password);
      handleConfirmPasswordChange(userFromRedux.password);
      handleAddressChange(userFromRedux.address.street);
    }
    //  setUser(userFromRedux);
    // setUser({ ...user, website: webmailInitialValue, phone: phoneInitialValue, address: addressInitialValue, company: companyInitialValue });
  }, []);

  useEffect(() => {
    console.log("called third use effect");
    if (
      !!name &&
      !nameError &&
      !!email &&
      !emailError &&
      !!username &&
      !usernameError &&
      !!password &&
      !passwordError &&
      !!confirmPassword &&
      !confirmPasswordError &&
      !!address &&
      !addressError &&
      !!selectedDate &&
      !dateError
    ) {
      setButtonDisableStatus(false);
    } else {
      setButtonDisableStatus(true);
    }
  });

  const handleClick = () => {
    console.log(selectedDate, selectedDate?.toUTCString());
    if (name && email && username && password && confirmPassword && address) {
      dispatch(
        setUserDetails({
          name: name,
          username: username,
          email: email,
          password: password,
          website: webmailInitialValue,
          phone: phoneInitialValue,
          address: { ...addressInitialValue, street: address },
          company: companyInitialValue,
          dob: String(selectedDate?.toString()),
        })
      );
      navigation.push("/confirmDetails");
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
            helperText={nameError ? "Please enter only alphabets" : ""}
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
            helperText={emailError ? "Please enter valid email id" : ""}
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
            required={!credentialViewFlag}
            helperText={usernameError ? "Please enter only alphanumeric value" : ""}
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
              required={!credentialViewFlag}
              helperText={
                passwordError ? "Password must have 1 capital letter, 1 small letter, 1 digit, special character and 7 to 15 letters long" : ""
              }
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
              required={!credentialViewFlag}
              helperText={confirmPasswordError ? "Confirm password and password must be same" : ""}
            />
          </div>
          <TextField
            error={addressError}
            value={address}
            multiline
            onFocus={() => setRowSize(4)}
            onBlur={() => setRowSize(1)}
            maxRows={rowSize}
            name="Address"
            className={styles.textField}
            onChange={(e) => handleAddressChange(e.target.value)}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            required
            helperText={addressError ? "Please enter address" : ""}
          />
          <div className={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Date Of Birth"
                format="DD/MM/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start", style: { order: 2, marginLeft: 0 } }}
                onChange={handleDateChange}
                fullWidth
                disableFuture
                error={dateError}
                invalidDateMessage=""
                InputProps={{
                  endAdornment: selectedDate != null && selectedDate != undefined && (
                    <InputAdornment position="end">
                      <IconButton className={styles.clearDateIcon} onClick={() => handleDateChange(null)}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={dateError ? "Please enter valid date" : ""}
              />
            </MuiPickersUtilsProvider>
          </div>
          {/* <Link style={{ width:"100%", marginTop:10,height:"3rem", font}} to={{pathname:'/details'}}> */}
          <Button disabled={buttonDisableStatus} onClick={handleClick} className={styles.button} variant="contained">
            Submit
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
