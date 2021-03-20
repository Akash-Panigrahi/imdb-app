import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Toast({ severity, message, isShowing, toggle }) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    toggle();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isShowing}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
