import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessIcon from "@material-ui/icons/Business";
import NoteIcon from "@material-ui/icons/Note";
import { User } from "./Signup";
import { RootState } from "../redux/store";
import { resetSelectedUser } from "../redux/userSlice";
import moment from "moment";
import { theme } from "../theme/Theme";

const useStyles = makeStyles({
  rootContainer: {
    display: "flex",
    width: "100%",
    padding: 20,
    // backgroundColor: "#cc313d",
    justifyContent: "center",
    alignItems: "center",
  },
  userCard: {
    width: 700,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 20,
    // backgroundColor: "#3caea3",
    background: theme.palette.primary.main,
  },
  personalDetails: {
    display: "flex",
    alignItems: "center",
  },
  otherDetails: {
    display: "flex",
    alignItems: "center",
  },
  userCircleIcon: { color: "#ffffff", fontSize: 60 },
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
    color: "#ffffff",
  },
  contactDetailsStyle: {
    display: "flex",
    alignItems: "center",
  },
  personalDetailsStyle: {
    margin: 5,
    backgroundColor: "#ffffff",
  },
  infoStyle: { color: "#ffffff" },
  infoButton: { backgroundColor: "#ffffff", alignSelf: "flex-start", justifySelf: "flex-start" },
});
export const UserDetails = () => {
  const styles = useStyles();
  const user = useSelector<RootState, User | any>((state: RootState) => state.user.selectedUser);
  const navigation = useHistory();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(resetSelectedUser());
    navigation.goBack();
  };
  return (
    <div className="container">
      <div className={styles.rootContainer}>
        <div className={styles.userCard}>
          <div className={styles.personalDetails}>
            <AccountCircleIcon className={styles.userCircleIcon} />
            <div className={styles.personDetailsContainer}>
              <div className={(styles.userDetailsStyle, styles.infoStyle)}>
                Username:
                <Chip className={styles.personalDetailsStyle} label={user.username} />
              </div>
              <div className={(styles.userDetailsStyle, styles.infoStyle)}>
                Name:
                <Chip className={styles.personalDetailsStyle} label={user.name} />
              </div>
              {user.dob && (
                <div className={(styles.userDetailsStyle, styles.infoStyle)}>
                  Date Of Birth:
                  <Chip className={styles.personalDetailsStyle} label={moment(user.dob).format("DD MMM yyyy").toString()} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.otherDetails}>
            <div className={styles.contactDetails}>
              <div className={styles.contactDetailsStyle}>
                <EmailIcon className={styles.icon} />
                <p className={styles.infoStyle}>{user.email}</p>
              </div>
              <div className={styles.contactDetailsStyle}>
                <LanguageIcon className={styles.icon} />
                <p className={styles.infoStyle}>{user.website}</p>
              </div>
              <div className={styles.contactDetailsStyle}>
                <PhoneIcon className={styles.icon} />
                <p className={styles.infoStyle}>{user.phone}</p>
              </div>
              <div className={styles.contactDetailsStyle}>
                <LocationOnIcon className={styles.icon} />
                <p className={styles.infoStyle}>{(user.address.street, user.address.suite, user.address.city, user.address.zipcode)}</p>
              </div>
            </div>
            <div className={styles.companyDetails}>
              <h5 className={styles.infoStyle}>Company Details</h5>
              <div className={styles.contactDetailsStyle}>
                <BusinessIcon className={styles.icon} />
                <p className={styles.infoStyle}>{user.company.name}</p>
              </div>
              <div className={styles.contactDetailsStyle}>
                <NoteIcon className={styles.icon} />
                <p className={styles.infoStyle}>{user.company.catchPhrase}</p>
              </div>
              <div className={styles.contactDetailsStyle}>
                <NoteIcon className={styles.icon} />
                <p className={styles.infoStyle}>{user.company.bs}</p>
              </div>
            </div>
          </div>
          <Button className={styles.infoButton} onClick={handleBackClick} variant="contained">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
