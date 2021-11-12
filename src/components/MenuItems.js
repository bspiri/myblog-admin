import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import InfoIcon from "@material-ui/icons/Info";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import BuildIcon from "@material-ui/icons/Build";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

export default function MenuItems(props) {
  const handleLogout = (e) => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    props.setLoginResult(false);
  };

  return (
    <div>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button component={Link} to="/post">
        <ListItemIcon>
          <BorderColorIcon />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>

      <ListItem button component={Link} to="/portfolio">
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </ListItem>
      <ListItem button component={Link} to="/about">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button component={Link} to="/contact">
        <ListItemIcon>
          <ContactMailIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
      <ListItem button component={Link} to="/logo">
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Logo" />
      </ListItem>
      <ListItem button component={Link} to="/social">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Social" />
      </ListItem>
      <ListItem button component={Link} to="/user">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
}
