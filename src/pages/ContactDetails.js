import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import RouteLink from "react-router-dom/Link";
import {
  Toolbar,
  Paper,
  Typography,
  Card,
  Tooltip,
  Button,
  CardContent,
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
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  titleCard: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function ContactDetails() {
  let { contact_id } = useParams();
  const classes = useStyles();
  const [contact, setContact] = useState({});
  const [isUpdated, setIsUpdated] = useState([new Date()]);
  //routing to update automatically within javascript
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/contact/${contact_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        response.data.create_date = moment(response.data.create_date).format(
          "DD-MMM-YYYY-HH-m"
        );
        setContact(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, isUpdated);

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Paper className={classes.paperw}>
      <Toolbar>
        <Typography
          variant="h5"
          id="tableTitle"
          gutterBottom
          className={classes.title}
        >
          Contact Message
        </Typography>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Back">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={RouteLink}
              to="/contact"
            >
              Back
            </Button>
          </Tooltip>
        </div>
      </Toolbar>

      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.titleCard}
            color="textSecondary"
            gutterBottom
          >
            {contact.create_date}
          </Typography>
          <Typography variant="h6" component="h2">
            {contact.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {contact.email}
          </Typography>
          <Typography variant="body2" component="p">
            {contact.message}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
