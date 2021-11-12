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
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  userCircleIcon: { color: "#a7beae", fontSize: 150 },
  userCardStyle: {
    display: "flex",
    padding: 10,
    justifyContent: "space-evenly",
  },
  userDetailsContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
  },
  cardTitle: {
    fontSize: 14,
  },
  userDetailsStyle: {
    flexDirection: "column",
    margin: 10,
  },
  personalDetailsStyle: {
    display: "flex",

    width: "50%",
    flexDirection: "column",
  },
  companyDetailsStyle: {
    display: "flex",

    width: "50%",
    flexDirection: "column",
  },
  infoButton: { backgroundColor: "#a7beae" },
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
      <Grid key={user.id} item>
        <Card className={styles.root}>
          <CardContent>
            <div className={styles.userDetailsContainer}>
              <AccountCircleIcon className={styles.userCircleIcon} />
              <div className={styles.userCardStyle}>
                <h5>Personal Details</h5>
                <div className={styles.personalDetailsStyle}>
                  {/* <Grid container justifyContent="center" spacing={6}> */}
                  {Object.keys(user).map((key) => {
                    if (key !== "address" && key !== "company" && key !== "id")
                      return (
                        <div className={styles.userDetailsStyle}>
                          {key}:
                          <Chip label={user[key]} />
                        </div>
                      );
                  })}
                  <div className={styles.userDetailsStyle}>
                    address:
                    <Chip label={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`} />
                  </div>
                  {/* </Grid> */}
                </div>
                <h5>Company Details</h5>
                <div className={styles.companyDetailsStyle}>
                  {Object.keys(user.company).map((key) => {
                    return (
                      <div className={styles.userDetailsStyle}>
                        {key}: <Chip label={user.company[key]} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button className={styles.infoButton} onClick={handleBackClick} variant="contained">
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
};
