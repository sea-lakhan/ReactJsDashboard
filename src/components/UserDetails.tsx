import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Avatar, Chip, Grid } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessIcon from "@material-ui/icons/Business";
const useStyles = makeStyles({
  rootContainer: {
    display: "flex",
    flex: 2,
    height: "100%",
    padding: 20,
    backgroundColor: "#cc313d",
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    width: 700,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  personalDetails: {
    display: "flex",
    alignItems: "center",
  },
  otherDetails: {
    display: "flex",
    alignItems: "center",
  },
  userCircleIcon: { color: "#a7beae", fontSize: 60 },
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
    color: "#a7beae",
  },
  contactDetailsStyle: {
    display: "flex",
    alignItems: "center",
  },
  personalDetailsStyle: {
    margin: 5,
  },
});
export const UserDetails = () => {
  const styles = useStyles();
  const user = useSelector((state: any) => state.user.selectedUser);
  const navigation = useNavigate();
  const handleBackClick = () => {
    navigation("/");
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.userCard}>
        <div className={styles.personalDetails}>
          <AccountCircleIcon className={styles.userCircleIcon} />
          <div className={styles.personDetailsContainer}>
            <div className={styles.userDetailsStyle}>
              Username:
              <Chip className={styles.personalDetailsStyle} label={user.username} />
            </div>
            <div className={styles.userDetailsStyle}>
              Name:
              <Chip className={styles.personalDetailsStyle} label={user.name} />
            </div>
          </div>
        </div>
        <div className={styles.otherDetails}>
          <div className={styles.contactDetails}>
            <div className={styles.contactDetailsStyle}>
              <EmailIcon className={styles.icon} />
              <p>{user.email}</p>
            </div>
            <div className={styles.contactDetailsStyle}>
              <LanguageIcon className={styles.icon} />
              <p>{user.website}</p>
            </div>
            <div className={styles.contactDetailsStyle}>
              <PhoneIcon className={styles.icon} />
              <p>{user.phone}</p>
            </div>
            <div className={styles.contactDetailsStyle}>
              <LocationOnIcon className={styles.icon} />
              <p>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
            </div>
          </div>
          <div className={styles.companyDetails}>
            <h5>Company Details</h5>
            <div className={styles.contactDetailsStyle}>
              <BusinessIcon className={styles.icon} />
              <p>{user.company.name}</p>
            </div>
            <div className={styles.contactDetailsStyle}>
              {/* <LocationOnIcon className={styles.icon} /> */}
              <p>{user.company.catchPhrase}</p>
            </div>
            <div className={styles.contactDetailsStyle}>
              {/* <LocationOnIcon className={styles.icon} /> */}
              <p>{user.company.bs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
