import { useEffect, useState } from "react";
import TextFields from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, makeStyles, Paper, Radio, RadioGroup, Select } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton, InputAdornment } from "@material-ui/core";
import { setSignupUser, setUserDetails } from "../redux/userSlice";

import { RootState } from "../redux/store";
import {
  AlphabetValidation,
  AlphaNumericWithUnderscoreValidation,
  EmailValidation,
  MobileNumberValidation,
  PasswordValidation,
  ZipcodeValidation,
} from "../validation";
import { theme } from "../theme/Theme";
import { DatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateAdapter from "@mui/lab/AdapterMoment";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, createMuiTheme, ThemeProvider, styled } from "@mui/material/styles";
import "../theme/datepickerStyles.css";
import moment from "moment";
import { minHeight, minWidth } from "@mui/system";
import axios, { Axios } from "axios";

const useStyle = makeStyles((theme) => ({
  signupContainer: {
    display: "flex",
    minHeight: "100%",
    minWidth: "70%",
    alignSelf: "center",
    justifySelf: "flex-start",
    padding: "2rem",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#cc313d",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  basicContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "10px",
      alignSelf: "center",
    },
  },
  formControl: {
    marginTop: 10,
    minWidth: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "10px",
    },
  },
  selectEmpty: {
    marginTop: "10px",
  },
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
  credentialContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  credentialTextFields: {
    width: "49%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  button: { width: "30%", marginTop: 5, height: "3rem", backgroundColor: "#3caea3", color: "#fff" },
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
  radioButtonContainer: {
    display: "flex",
    marginTop: "10px",
  },
}));

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

export const SignupNew = () => {
  const userFromRedux = useSelector<RootState, User | any>((state: RootState) => state.user.selectedUser);
  const dispatch = useDispatch();
  const navigation = useHistory();

  const styles = useStyle();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<number | string>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<number | string>();
  const [companyName, setCompanyName] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState<string>("");
  const [bs, setBs] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [vaccination, setVaccination] = useState<string>("Not Vaccinated");
  const [dob, setDob] = useState();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [contactNumberError, setContactNumberError] = useState<boolean>(false);
  const [cityError, setCityError] = useState<boolean>(false);
  const [zipcodeError, setZipcodeError] = useState<boolean>(false);
  const [companyNameError, setCompanyNameError] = useState<boolean>(false);
  const [catchPhraseError, setCatchPhraseError] = useState<boolean>(false);
  const [bsError, setBsError] = useState<boolean>(false);

  const [credentialViewFlag, setCredentialViewFlag] = useState<boolean>(true);
  const [buttonDisableStatus, setButtonDisableStatus] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<boolean>(false);
  const [rowSize, setRowSize] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dateError, setDateError] = useState<boolean>(false);
  const [dateState, setDateState] = useState<boolean>(false);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleFirstNameChange = (fname: string) => {
    setFirstNameError(!AlphabetValidation.test(fname));
    setFirstName(fname);
  };
  const handleLastNameChange = (lname: string) => {
    setLastNameError(!AlphabetValidation.test(lname));
    setLastName(lname);
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

  const handleContactNumberChange = (contact: string) => {
    if (!!contact) {
      setContactNumberError(!MobileNumberValidation.test(contact));
      setContactNumber(Number(contact));
    } else {
      setContactNumberError(false);
      setContactNumber(contact);
    }
  };

  const handleDesignationChange = (designation: string) => {
    setDesignation(designation);
  };

  const handleCityChange = (city: any) => {
    if (!!city) setCityError(!AlphabetValidation.test(city));
    setCity(city);
  };

  const handleZipcodeChange = (zipcode: string) => {
    if (!!zipcode) {
      setZipcodeError(!ZipcodeValidation.test(zipcode));
      setZipcode(zipcode);
    } else {
      setZipcodeError(false);
      setZipcode("");
    }
  };

  const handleCompanyNameChange = (companyName: string) => {
    setCompanyNameError(!AlphabetValidation.test(companyName));
    setCompanyName(companyName);
  };

  const handleCatchePhraseChange = (catchPhrase: string) => {
    setCatchPhraseError(!AlphabetValidation.test(catchPhrase));
    setCatchPhrase(catchPhrase);
  };

  const handleBsChange = (bs: string) => {
    setBsError(!AlphabetValidation.test(bs));
    setBs(bs);
  };

  const handleVaccinationChange = (value: string) => {
    setVaccination(value);
  };

  const handleDateChange = (date: any | null) => {
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

  // useEffect(() => {
  //   console.log("from second use effect");
  //   if (!!userFromRedux.username && !!userFromRedux.name && !!userFromRedux.email && !!userFromRedux.password) {
  //     handleFirstNameChange(userFromRedux.name);
  //     handleLastNameChange(userFromRedux.name);
  //     handleUsernameChange(userFromRedux.username);
  //     handleEmailChange(userFromRedux.email);
  //     handlePasswordChange(userFromRedux.password);
  //     handleConfirmPasswordChange(userFromRedux.password);
  //     handleAddressChange(userFromRedux.address.street);
  //     handleDateChange(moment(userFromRedux.dob));
  //   }
  //   //  setUser(userFromRedux);
  //   // setUser({ ...user, website: webmailInitialValue, phone: phoneInitialValue, address: addressInitialValue, company: companyInitialValue });
  // }, []);

  useEffect(() => {
    if (
      !!firstName &&
      !firstNameError &&
      !!lastName &&
      !lastNameError &&
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
      !!city &&
      !cityError &&
      !!zipcode &&
      !zipcodeError &&
      !!companyName &&
      !companyNameError &&
      !!catchPhrase &&
      !catchPhraseError &&
      !!bs &&
      !bsError &&
      !!contactNumber &&
      !contactNumberError
    ) {
      setButtonDisableStatus(false);
    } else {
      setButtonDisableStatus(true);
    }
  });

  const handleClick = async () => {
    if (
      !!firstName &&
      !!lastName &&
      !!email &&
      !!username &&
      !!password &&
      !!confirmPassword &&
      !!contactNumber &&
      !!!!address &&
      !!city &&
      !!zipcode &&
      !!companyName &&
      !!catchPhrase &&
      !!bs
    ) {
      let user = {
        firstName,
        lastName,
        email,
        username,
        password,
        vaccination,
        dob: selectedDate,
        contact: contactNumber,
        address: { street: address, city, zipcode },
        company: { name: companyName, catchPhrase, bs, designation },
      };
      await axios
        .post("http://localhost:3006/users", user)
        .then((response) => {
          navigation.push("/dashboard");
        })
        .catch((error) => alert(error));
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <div className="container">
      <h1 className={styles.heading}>Sign Up</h1>
      <div className={styles.basicContainer}>
        <Grid className={styles.signupContainer}>
          <Grid item xs={12} sm={6} className={styles.formContainer}>
            <div className={styles.credentialContainer}>
              <TextFields
                error={firstNameError}
                value={firstName}
                name="firstName"
                className={styles.credentialTextFields}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                required
                helperText={firstNameError ? "Please enter only alphabets" : ""}
              />
              <TextFields
                error={lastNameError}
                value={lastName}
                name="lastName"
                className={styles.credentialTextFields}
                onChange={(e) => handleLastNameChange(e.target.value)}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                required
                helperText={lastNameError ? "Please enter only alphabets" : ""}
              />
            </div>
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
              error={contactNumberError}
              value={contactNumber}
              name="contactNumber"
              className={styles.textField}
              onChange={(e) => handleContactNumberChange(e.target.value)}
              id="outlined-basic"
              label="Contact Number"
              variant="outlined"
              required
              helperText={contactNumberError ? "Please enter contact number" : ""}
            />
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
            <div className={styles.credentialContainer}>
              <FormControl variant="outlined" className={styles.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                <Select
                  native
                  style={{ backgroundColor: "#ffffff" }}
                  error={cityError}
                  value={city}
                  onChange={(e) => handleCityChange(e.target?.value)}
                  label="City"
                  inputProps={{
                    name: "City",
                    id: "outlined-age-native-simple",
                  }}
                  required
                >
                  <option aria-label="None" value="" />
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nagpur">Nagpur</option>
                </Select>
              </FormControl>
              <TextFields
                error={zipcodeError}
                value={zipcode}
                name="zipcode"
                className={styles.credentialTextFields}
                onChange={(e) => handleZipcodeChange(e.target.value)}
                id="outlined-basic"
                label="Zipcode"
                variant="outlined"
                required
                helperText={zipcodeError ? "Please enter valid zipcode" : ""}
              />
            </div>
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
          </Grid>
          <Grid item xs={12} sm={6} className={styles.formContainer}>
            <TextFields
              error={companyNameError}
              value={companyName}
              name="company"
              className={styles.textField}
              onChange={(e) => handleCompanyNameChange(e.target.value)}
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              required
              helperText={companyNameError ? "Please enter company name" : ""}
            />
            <TextFields
              value={designation}
              name="company"
              className={styles.textField}
              onChange={(e) => handleDesignationChange(e.target.value)}
              id="outlined-basic"
              label="Designation"
              variant="outlined"
            />
            <TextFields
              error={catchPhraseError}
              value={catchPhrase}
              name="company"
              className={styles.textField}
              onChange={(e) => handleCatchePhraseChange(e.target.value)}
              id="outlined-basic"
              label="Catch Phrase"
              variant="outlined"
              required
              helperText={catchPhraseError ? "Please enter catch phrase" : ""}
            />
            <TextFields
              error={bsError}
              value={bs}
              name="company"
              className={styles.textField}
              onChange={(e) => handleBsChange(e.target.value)}
              id="outlined-basic"
              label="BS"
              variant="outlined"
              required
              helperText={bsError ? "Please enter bs" : ""}
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
          </Grid>
        </Grid>
        <FormControl className={styles.radioButtonContainer} component="fieldset">
          <FormLabel component="legend">Are you vaccinated?</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={vaccination} onChange={(e) => handleVaccinationChange(e.target.value)}>
            <Grid>
              <FormControlLabel value="1 dose completed" control={<Radio color="primary" />} label="1 Dosh Completed" />
              <FormControlLabel value="2 dose completed" control={<Radio color="primary" />} label="2 Dosh Completed" />
              <FormControlLabel value="Not Vaccinated" control={<Radio color="primary" />} label="Not Vaccinated" />
            </Grid>
          </RadioGroup>
        </FormControl>
        <Button disabled={buttonDisableStatus} onClick={handleClick} className={styles.button} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};
