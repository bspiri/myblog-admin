import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Toolbar,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paperw: {
    width: "100%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    flex: "0 0 auto",
  },
  spacer: {
    flex: "1 1 100%",
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
}));

export default function Comments() {
  let { post_id } = useParams();
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [isUpdated, setIsUpdated] = useState([new Date()]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${post_id}/comment`)
      .then(function (response) {
        response.data.map((item) => {
          return (item.create_date = moment(item.create_date).format(
            "DD-MMM-YYYY-HH-m"
          ));
        });
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, isUpdated);

  const handleDelete = (comment_id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/post/${post_id}/comment/${comment_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("Comment deleted");
        setIsUpdated([new Date()]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Paper className={classes.paperw}>
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
                  Comments
                </Typography>
                <div className={classes.spacer} />
              </Toolbar>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="left">Content</TableCell>
            <TableCell align="left">Create Date</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => {
            return (
              <TableRow key={comment.id}>
                <TableCell component="th" scope="row">
                  {comment.author}
                </TableCell>
                <TableCell align="left">{comment.content}</TableCell>
                <TableCell align="left">{comment.create_date}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                      handleDelete(comment.id);
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
