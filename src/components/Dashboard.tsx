import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Divider, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUserList } from "../redux/userSlice";
import { RootState } from "../redux/store";

import { Chip } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessIcon from "@material-ui/icons/Business";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WorkIcon from "@material-ui/icons/Work";
import CakeIcon from "@material-ui/icons/Cake";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BlockIcon from "@material-ui/icons/Block";
import moment from "moment";
import { theme } from "../theme/Theme";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: "flex",
    flex: 2,
    height: "100%",
    padding: 20,
    minWidth: "80%",
    // backgroundColor: "#cc313d",
  },
  root: {
    flexGrow: 1,
    padding: 10,
    flexDirection: "row",
    minWidth: "80vw",
    alignSelf: "center",
  },
  accordionHeader: {
    display: "flex",
    width: "50%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  accordionContainer: {
    display: "flex",
    flexDirection: "column",
    minWidth: "100%",
    alignItems: "center",
  },
  heading: {
    display: "flex",
    minWidth: "90%",
    alignItems: "center",
  },
  userCircleIcon: { fontSize: 20 },
  nameStyle: {
    display: "flex",
    width: "40%",
    marginLeft: 10,
    marginRight: 10,
  },
  emailStyle: {
    fontSize: 15,
    color: theme.palette.text.secondary,
  },
  accordionBody: {
    display: "flex",
    minWidth: "90vw",
  },
  personDetailsContainer: {
    display: "flex",
  },
  userDetailsStyle: {
    flexDirection: "column",
    margin: 10,
  },
  contactDetails: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  companyDetails: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    top: 0,
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
  },
  deleteIcon: {
    color: "#ffffff",
  },
  contactDetailsStyle: {
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
  personalDetailsStyle: {
    margin: 5,
  },
  infoButton: { alignSelf: "flex-end", backgroundColor: theme.palette.primary.main },
}));

export const Dashboard = () => {
  const styles = useStyles();
  let navigation = useHistory();
  const user = useSelector<RootState, { userList: any }>((state: any) => state.user);
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

  const deleteUser = async (id: number) => {
    await removeUser(id);
    dispatch(addUserList(user.userList.filter((user: any) => user.id !== id)));
  };

  return (
    <div className="container">
      <div className={styles.rootContainer}>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            {user.userList &&
              user.userList.map((user: any) => (
                <Accordion className={styles.accordionContainer}>
                  <AccordionSummary className={styles.heading} expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className={styles.accordionHeader}>
                      <AccountCircleIcon className={styles.userCircleIcon} />
                      <Typography className={styles.nameStyle}>
                        {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User"}
                      </Typography>
                    </div>
                    <Typography className={styles.emailStyle}>{user.email}</Typography>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails className={styles.accordionBody}>
                    <div className={styles.accordionBody}>
                      <div className={styles.contactDetails}>
                        <div className={styles.contactDetailsStyle}>
                          <EmailIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>{user.username}</Typography>
                        </div>
                        <div className={styles.contactDetailsStyle}>
                          <LanguageIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>{user.email}</Typography>
                        </div>
                        <div className={styles.contactDetailsStyle}>
                          <PhoneIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>{user.contact}</Typography>
                        </div>
                        <div className={styles.contactDetailsStyle}>
                          <LocationOnIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>
                            {user.address.street} {user.address.city} {user.address.zipcode}
                          </Typography>
                        </div>
                        {user.dob && (
                          <div className={styles.contactDetailsStyle}>
                            <CakeIcon className={styles.icon} />
                            <Typography className={styles.emailStyle}>{moment(user.dob).format("DD MMM yyyy").toString()} </Typography>
                          </div>
                        )}
                      </div>
                      <div className={styles.contactDetails}>
                        <div className={styles.contactDetailsStyle}>
                          <BusinessIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>{user.company.name}</Typography>
                        </div>
                        <div className={styles.contactDetailsStyle}>
                          <NoteIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>{user.company.catchPhrase}</Typography>
                        </div>
                        <div className={styles.contactDetailsStyle}>
                          <NoteIcon className={styles.icon} />
                          <Typography className={styles.emailStyle}>{user.company.bs}</Typography>
                        </div>
                        {!!user.company.designation && (
                          <div className={styles.contactDetailsStyle}>
                            <WorkIcon className={styles.icon} />
                            <Typography className={styles.emailStyle}>{user.company.designation}</Typography>
                          </div>
                        )}
                        <div className={styles.contactDetailsStyle}>
                          {user.vaccination == "1 dose completed" ? (
                            <CheckCircleOutlineIcon className={styles.icon} style={{ color: theme.palette.secondary.main }} />
                          ) : user.vaccination == "2 dose completed" ? (
                            <CheckCircleIcon className={styles.icon} style={{ color: theme.palette.secondary.main }} />
                          ) : (
                            <BlockIcon className={styles.icon} style={{ color: "red" }} />
                          )}
                          <Typography className={styles.emailStyle}>{user.vaccination ? user.vaccination : "not vaccinated"}</Typography>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                  <Divider />

                  <AccordionActions>
                    <Button size="small" color="primary">
                      <DeleteIcon />
                      Delete
                    </Button>
                  </AccordionActions>
                </Accordion>
              ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
