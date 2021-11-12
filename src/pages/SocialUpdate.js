import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import {
  Button,
  Toolbar,
  Tooltip,
  Paper,
  Typography,
  Divider,
  InputLabel,
  Select,
  Input,
  Grid,
  FormControl,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
import { faSnapchat } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faTumblr } from "@fortawesome/free-brands-svg-icons";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SocialUpdate() {
  let { id } = useParams();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [alert, setAlert] = useState(false);
  //routing to social list automatically within javascript
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/social/${id}`)
      .then(function (response) {
        setName(response.data.name);
        setUrl(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
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
        `${process.env.REACT_APP_API_URL}/social/${id}`,
        {
          name: name,
          url: url,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("Social media details saved");
        history.push("/social");
        setAlert(true);
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
          Update Social Media
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                onChange={handleName}
              >
                <MenuItem value="facebook">
                  <FacebookIcon /> Facebook
                </MenuItem>
                <MenuItem value="twitter">
                  <TwitterIcon /> Twitter
                </MenuItem>
                <MenuItem value="linkedin">
                  <LinkedInIcon /> LinkedIn
                </MenuItem>
                <MenuItem value="instagram">
                  <InstagramIcon /> Instagram
                </MenuItem>
                <MenuItem value="snapchat">
                  <FontAwesomeIcon size="lg" icon={faSnapchat} /> Snapchat
                </MenuItem>
                <MenuItem value="pinterest">
                  <PinterestIcon /> Pinterest
                </MenuItem>
                <MenuItem value="reddit">
                  <RedditIcon /> Reddit
                </MenuItem>
                <MenuItem value="github">
                  <GitHubIcon /> Github
                </MenuItem>
                <MenuItem value="youtube">
                  <YouTubeIcon /> YouTube
                </MenuItem>
                <MenuItem value="discord">
                  <FontAwesomeIcon size="lg" icon={faDiscord} /> Discord
                </MenuItem>
                <MenuItem value="tumblr">
                  <FontAwesomeIcon size="lg" icon={faTumblr} /> Tumblr
                </MenuItem>
                <MenuItem value="skype">
                  <FontAwesomeIcon size="lg" icon={faSkype} />
                  Skype
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="url">URL</InputLabel>
              <Input
                id="url"
                name="url"
                autoComplete="imageUrl"
                onChange={handleUrl}
                autoFocus
                value={url}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
