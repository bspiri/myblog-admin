import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import clsx from "clsx";
import {
  Button,
  Toolbar,
  Tooltip,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  Grid,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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

export default function PostUpdate() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [alert, setAlert] = useState(false);
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //routing to post list automatically within javascript
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setName(response.data.name);
        setEmail(response.data.email);
        setImageUrl(response.data.image_path);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
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
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        {
          name: name,
          email: email,
          password: password,
          image_path: imageUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("User updated");
        setAlert(true);
        history.push("/user");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          Content saved!
        </Alert>
      </Snackbar>
      <Toolbar>
        <Typography
          variant="h6"
          id="tableTitle"
          gutterBottom
          className={classes.title}
        >
          Update User
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                onChange={handleName}
                autoFocus
                value={name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                onChange={handleEmail}
                autoFocus
                value={email}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Confirm password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="imageUrl">Image url</InputLabel>
              <Input
                id="imageUrl"
                name="imageUrl"
                autoComplete="imageUrl"
                onChange={handleImageUrl}
                autoFocus
                value={imageUrl}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
