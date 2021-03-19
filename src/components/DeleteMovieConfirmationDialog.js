import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteMovieConfirmationDialog({
  movie,
  deleteMovie,
  closeDeleteDialog,
}) {
  return (
    <Dialog
      open={true}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Delete movie</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete <strong>{movie.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDeleteDialog}>
          No
        </Button>
        <Button color="secondary" onClick={() => deleteMovie(movie)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
