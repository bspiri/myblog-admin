import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Toolbar,
  Tooltip,
  Link,
  Avatar,
  Typography,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { Link as RouteLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";

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

export default function PostList() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isUpdated, setIsUpdated] = useState([new Date()]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post`)
      .then(function (response) {
        response.data.map((item) => {
          return (item.create_date = moment(item.create_date).format(
            "DD-MMM-YYYY-HH-m"
          ));
        });
        response.data.map((item) => {
          if (item.update_date == null) {
            return (item.update_date = "has not yet updated");
          }
          return (item.update_date = moment(item.update_date).format(
            "DD-MMM-YYYY-HH-m"
          ));
        });
        setPosts(response.data);
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

  const handleDelete = (post_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${post_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("Blog post deleted");
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
          Blog post deleted
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
                  Blog
                </Typography>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                  <Tooltip title="Add New">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      component={RouteLink}
                      to="/post/new"
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
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Comment Count</TableCell>
            <TableCell align="center">Create Date</TableCell>
            <TableCell align="left">Update Date</TableCell>
            <TableCell align="left">Thumbnail</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => {
            return (
              <TableRow key={post.id}>
                <TableCell component="th" scope="row">
                  {post.id}
                </TableCell>
                <TableCell style={{ width: 250 }} align="left">
                  {post.title}
                </TableCell>
                <TableCell align="left">
                  <Link component={RouteLink} to={`/post/${post.id}/comment`}>
                    {post.comment_count}
                  </Link>
                </TableCell>
                <TableCell align="center">{post.create_date}</TableCell>
                <TableCell align="left">{post.update_date}</TableCell>
                <TableCell align="left">
                  <Avatar src={post.image_path} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    component={RouteLink}
                    to={`/post/${post.id}/update/`}
                  >
                    Update
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                      handleDelete(post.id);
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
