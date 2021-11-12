import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Toolbar,
  Tooltip,
  Paper,
  Typography,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
} from "@material-ui/core";
import RouteLink from "react-router-dom/Link";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    overflowX: "auto",
  },
  paperw: {
    width: "100%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  table: {
    // minWidth: 700,
  },
  title: {
    flex: "0 0 auto",
  },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
  button: {
    marginLeft: theme.spacing(),
  },
}));

export default function UserList() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isUpdated, setIsUpdated] = useState([new Date()]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, isUpdated);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  const handleDelete = (user_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user/${user_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("User deleted");
        setAlert(true);
        setIsUpdated([new Date()]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Paper className={classes.paperw}>
      <Snackbar
        className={classes.root}
        open={alert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          User deleted
        </Alert>
      </Snackbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={7} padding="none">
              <Toolbar>
                <Typography
                  variant="h6"
                  id="tableTitle"
                  className={classes.title}
                >
                  Users
                </Typography>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                  <Tooltip title="Add New">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      component={RouteLink}
                      to="/user/new"
                    >
                      Add&nbsp;New
                      <AddIcon className={classes.rightIcon} />
                    </Button>
                  </Tooltip>
                </div>
              </Toolbar>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Thumbnail</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">
                  <Avatar src={user.image_path} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    component={RouteLink}
                    to={`/user/${user.id}/update/`}
                  >
                    Update
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
