import { useEffect, useRef, useState } from "react";
import TextFields from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton, InputAdornment } from "@material-ui/core";
import { setUserDetails } from "../redux/userSlice";

import { RootState } from "../redux/store";
import { AlphabetValidation, AlphaNumericWithUnderscoreValidation, EmailValidation, PasswordValidation } from "../validation";
import { theme } from "../theme/Theme";
import { DatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateAdapter from "@mui/lab/AdapterMoment";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, createMuiTheme, ThemeProvider, styled } from "@mui/material/styles";
import "../theme/datepickerStyles.css";
import moment from "moment";

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

const datePickerTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: theme.palette.primary.main,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: `${theme.palette.primary.dark}!important`,
          "&.Mui-selected": {
            border: "3px solid",
            backgroundColor: "transparent!important",
            borderColor: `${theme.palette.primary.dark}!important`,
            color: `${theme.palette.primary.main}!important`,
          },
        },
        caption: {
          color: theme.palette.primary.main,
          borderBottom: "1px solid",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          color: `${theme.palette.primary.main}!important`,
          "&.css-1tnxc9w-MuiButtonBase-root-MuiPickersDay-root": {
            // color:,
          },
          "&.Mui-selected": {
            backgroundColor: "transparent!important",
            border: "3px solid",
            borderColor: `${theme.palette.primary.main}!important`,
            borderWeight: "bold",
          },
          "&.css-1eyli8o-MuiButtonBase-root-MuiPickersDay-root": {
            border: "0px solid rgba(0,0,0,0.9)",
            borderColor: `${theme.palette.secondary.main}!important`,
          },
        },
      },
    },
    // Mui:{
    //   styleOverrides:{
    //     selected:{

    //     }
    //   }
    // }
    // MuiPickersDay: {
    //   styleOverrides: {
    //     root: { color: "#ffffff", backgroundColor: "#ffffff" },
    //   },
    // },
  },
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
  const [rowSize, setRowSize] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dateError, setDateError] = useState<boolean>(false);
  const [dateState, setDateState] = useState<boolean>(false);
  const [value, setValue] = useState<Date | null>(new Date());
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
      handleDateChange(moment(userFromRedux.dob));
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

  // const getDayView = (day: any, selectedDate: any, isInCurrentMonth: boolean) => {
  //   let dateTile;
  //   if (isInCurrentMonth) {
  //     //conditionally return appropriate Element of date tile.

  //     if (new Date(day) > new Date()) {
  //       dateTile = (
  //         <Paper className={styles.futureDay}>
  //           <Grid item> {new Date(day).getDate()}</Grid>
  //         </Paper>
  //       );
  //     } else {
  //       dateTile = (
  //         <Paper
  //           className={
  //             new Date(day).getDate() === new Date(selectedDate).getDate()
  //               ? styles.selectedDay
  //               : new Date(day).getDate() === new Date().getDate() && new Date(day).getMonth() === new Date().getMonth()
  //               ? styles.today
  //               : new Date(day) > new Date()
  //               ? styles.futureDay
  //               : styles.normalDay
  //           }
  //           onClick={() => {
  //             handleDateChange(day);
  //             setDateState(false);
  //           }}
  //         >
  //           <Grid item> {new Date(day).getDate()}</Grid>
  //         </Paper>
  //       );
  //     }
  //   } else {
  //     dateTile = (
  //       <Paper
  //         className={styles.notInThisMonthDay}
  //         onClick={() => {
  //           handleDateChange(day);
  //           setDateState(false);
  //         }}
  //       >
  //         <Grid item style={{ color: "lightGrey", borderRadius: 5 }}>
  //           {new Date(day).getDate()}
  //         </Grid>
  //       </Paper>
  //     );
  //   }
  //   return dateTile;
  // };

  return (
    <div className="container">
      <div className="signupContainer">
        <div className="formfields">
          <h1 className={styles.heading}>Sign Up</h1>
          <TextFields
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
          <TextFields
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
          <TextFields
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
            <TextFields
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
            <TextFields
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
          <TextFields
            error={addressError}
            value={address}
            multiline={!!rowSize}
            onFocus={() => setRowSize(4)}
            onBlur={() => setRowSize(0)}
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
            {/* <MuiPickersUtilsProvider utils={MomentUtils}>
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
                keyboardIcon={<ClearIcon />}
                error={dateError}
                invalidDateMessage=""
                InputProps={{
                  endAdornment: selectedDate != null && selectedDate != undefined && (
                    <InputAdornment position="end">
                      <IconButton className={styles.clearDateIcon} onClick={() => handleDateChange(null)}>
                        <ClearIcon />
                      </IconButton>
                      <IconButton className={styles.clearDateIcon} onClick={() => handleDateChange(null)}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                renderDay={getDayView}
                helperText={dateError ? "Please enter valid date" : ""}
              />
            </MuiPickersUtilsProvider> */}
            <ThemeProvider theme={datePickerTheme}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  views={["year", "month", "day"]}
                  label="Date of Birth"
                  value={selectedDate}
                  openTo="year"
                  disableFuture
                  toolbarPlaceholder="Select date"
                  mask="__/__/____"
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  InputAdornmentProps={{ position: "start", style: { order: 2, marginLeft: 0 } }}
                  InputProps={{
                    endAdornment: selectedDate != null && selectedDate != undefined && (
                      <InputAdornment position="end">
                        <IconButton className={styles.clearDateIcon} onClick={() => handleDateChange(null)}>
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  renderInput={(params) => <TextField {...params} placeholder={"Select Date"} />}
                />
              </LocalizationProvider>
            </ThemeProvider>
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
