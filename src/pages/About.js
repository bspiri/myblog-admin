import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Toolbar,
  Tooltip,
  Paper,
  Typography,
  Divider,
  Snackbar,
  FormControl,
  Grid,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
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
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function About() {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/about`)
      .then(function (response) {
        setContent(response.data.content);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(response.data.content)
            )
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleContent = (newEditorState) => {
    setEditorState(newEditorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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
        `${process.env.REACT_APP_API_URL}/about`,
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
        console.log("Content saved");
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
          Update About
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
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl margin="normal" required fullWidth>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  border: "1px solid #ccdddd",
                  marginBottom: "20px",
                }}
                editorStyle={{ height: "300px", padding: "10px" }}
                onEditorStateChange={handleContent}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
