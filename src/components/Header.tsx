import { useState } from "react";
// import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles({
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
});

export const Header = () => {
  const styles = useStyles();
  const navigation = useHistory();
  const [toggleMenu, setToggleMenu] = useState(null);

  const handleMenu = (event: any) => {
    console.log(event.currentTarget);
    setToggleMenu(event.currentTarget);
  };

  const handleAddUserClick = () => {
    navigation.push("/addUser");
    handleClose();
  };

  const handleUserDashboardClick = () => {
    navigation.goBack();
    handleClose();
  };

  const handleClose = () => {
    setToggleMenu(null);
  };

  return (
    // <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" onClick={handleMenu} className={styles.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={toggleMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(toggleMenu)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAddUserClick}>Add User</MenuItem>
        <MenuItem onClick={handleUserDashboardClick}>User Dashboard</MenuItem>
      </Menu>
      <Typography variant="h6" component="div" className={styles.title}>
        User Dashboard
      </Typography>
    </Toolbar>
    // </AppBar>
  );
};
