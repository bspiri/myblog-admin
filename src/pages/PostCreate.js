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
  TextField,
  InputLabel,
  Input,
  Grid,
  FormControl,
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

export default function PostCreate() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [addTags, setAddTags] = useState("");
  const [alert, setAlert] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //routing to post list automatically within javascript
  let history = useHistory();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSummary = (e) => {
    setSummary(e.target.value);
  };
  const handleContent = (newEditorState) => {
    setEditorState(newEditorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleAddTags = (e) => {
    setAddTags(e.target.value);
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
        `${process.env.REACT_APP_API_URL}/post`,
        {
          title: title,
          summary: summary,
          content: content,
          image_path: imageUrl,
          tags: addTags,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        console.log("Blog post saved");
        setAlert(true);
        history.push("/post");
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
          Add New Blog Post
        </Typography>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Save Form">
            <Button
              type="button"
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
        <Grid container>
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
              <TextField
                id="summary"
                label="Summary"
                multiline
                rows={8}
                value={summary}
                onChange={handleSummary}
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

          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="tags">Add tags</InputLabel>
              <Input
                id="tags"
                name="tags"
                autoComplete="tags"
                onChange={handleAddTags}
                value={addTags}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
