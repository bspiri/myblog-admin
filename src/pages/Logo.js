import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Toolbar,
  Tooltip,
  Paper,
  Typography,
  Divider,
  TableCell,
  Grid,
  Input,
  InputLabel,
  FormControl,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Logo() {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [alert, setAlert] = useState(false);
  //routing to update automatically within javascript
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/logo`)
      .then(function (response) {
        setImageUrl(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };
  const handleSave = (e) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/logo`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("Logo saved");
        setAlert(true);
        setContent("");
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
          Logo saved!
        </Alert>
      </Snackbar>
      <Toolbar>
        <Typography
          variant="h6"
          id="tableTitle"
          gutterBottom
          className={classes.title}
        >
          Update Logo
        </Typography>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Save Form">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSave}
            >
              Save
              <SaveIcon className={classes.rightIcon} />
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
      <form className={classes.root} noValidate autoComplete="off">
        <Divider />
        <Grid container spacing={1}>
          <TableCell align="center">
            <img src={imageUrl} alt="" />
          </TableCell>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="content">Image url</InputLabel>
              <Input
                id="content"
                name="content"
                autoComplete="content"
                onChange={handleContent}
                autoFocus
                value={content}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
