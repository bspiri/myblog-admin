import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Toolbar,
  Tooltip,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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

export default function PortfolioCreate() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [alert, setAlert] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //routing to post list automatically within javascript
  let history = useHistory();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (newEditorState) => {
    setEditorState(newEditorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
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
      .post(
        `${process.env.REACT_APP_API_URL}/portfolio`,
        {
          title: title,
          content: content,
          url: url,
          image_path: imageUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("Portfolio saved");
        setAlert(true);
        history.push("/portfolio");
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
          Add New Portfolio
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
        <Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                name="title"
                autoComplete="title"
                onChange={handleTitle}
                autoFocus
                value={title}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                wrapperStyle={{
                  border: "1px solid #ccdddd",
                  marginBottom: "20px",
                }}
                editorClassName="editorClassName"
                onEditorStateChange={handleContent}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="imageUrl">URL</InputLabel>
              <Input
                id="imageUrl"
                name="imageUrl"
                autoComplete="imageUrl"
                onChange={handleUrl}
                autoFocus
                value={url}
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
