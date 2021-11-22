import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Navigation } from "@material-ui/icons";
import { useNavigate } from "react-router";
import { resetSelectedUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(null);

  const handleClick = () => {
    navigation("/");
    dispatch(resetSelectedUser());
  };

  const handleMenu = (event: any) => {
    console.log(event.currentTarget);
    setToggleMenu(event.currentTarget);
  };

  const handleAddUserClick = () => {
    navigation("/addUser");
    handleClose();
  };

  const handleUserDashboardClick = () => {
    navigation("/");
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
