import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import useToast from "../hooks/useToast";
import Toast from "./Toast";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddEditMovie({ movie: initialMovie, operation }) {
  const classes = useStyles();
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState({
    name: { value: initialMovie.name, error: "" },
    director: { value: initialMovie.director, error: "" },
    genres: { value: initialMovie.genres, error: "" },
    popularity: { value: initialMovie["99popularity"], error: "" },
  });
  const [toastSeverity, setToastSeverity] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { isShowing, toggle } = useToast();

  const handleMovieSubmit = async (event) => {
    event.preventDefault();

    let url = process.env.REACT_APP_BASE_URL + "/movie";
    if (operation === "edit") url += "/" + initialMovie._id;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: movie.name.value,
          director: movie.director.value,
          genres: movie.genres.value,
          popularity: movie.popularity.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.status === 409) {
        setToastSeverity("error");
      } else {
        setToastSeverity("success");
      }

      setToastMessage(data.message);
      toggle();
    } catch (error) {
      setToastSeverity("error");
      setToastMessage(error.message);
      toggle();
    }
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/genre")
      .then((res) => res.json())
      .then((data) => setGenres(data.map((genre) => genre.name)));
  }, []);

  const handleField = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "name") {
      if (value === "") error = "Name is required";
    } else if (name === "director") {
      if (value === "") error = "Director is required";
    } else if (name === "popularity") {
      if (value === "") error = "Popularity is required";
      else if (value < 1 || value > 99)
        error = "Popularity must be within 1 and 99";
    } else if (name === "genres") {
      if (value.length === 0) error = "Genres is required";
    }

    setMovie({
      ...movie,
      [name]: { value, error },
    });
  };

  const handleGenreChange = (event, value) => {
    handleField({ target: { name: "genres", value } });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Movie Detail
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleMovieSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Movie name"
            name="name"
            value={movie.name.value}
            autoComplete="name"
            autoFocus
            error={Boolean(movie.name.error)}
            helperText={movie.name.error}
            onChange={handleField}
            onBlur={handleField}
            disabled={operation === "edit"}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="director"
            label="Director"
            value={movie.director.value}
            id="director"
            autoComplete="director"
            error={Boolean(movie.director.error)}
            helperText={movie.director.error}
            onChange={handleField}
            onBlur={handleField}
          />
          <Autocomplete
            multiple
            id="genres"
            freeSolo
            autoSelect
            value={movie.genres.value}
            onChange={handleGenreChange}
            options={genres}
            getOptionLabel={(option) => option}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                error={Boolean(movie.genres.error)}
                helperText={movie.genres.error}
                label="Genres"
                variant="outlined"
                placeholder="Add genre"
              />
            )}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="popularity"
            label="Popularity"
            value={movie.popularity.value}
            type="number"
            InputProps={{ inputProps: { min: 1, max: 9 } }}
            id="popularity"
            autoComplete="popularity"
            error={Boolean(movie.popularity.error)}
            helperText={movie.popularity.error}
            onChange={handleField}
            onBlur={handleField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={Boolean(
              movie.name.error ||
                movie.director.error ||
                movie.genres.error ||
                movie.popularity.error
            )}
          >
            {operation === "edit" ? "Edit" : "Add"} Movie
          </Button>
        </form>
      </Container>

      {/* Toast */}
      {isShowing && (
        <Toast
          severity={toastSeverity}
          message={toastMessage}
          isShowing={isShowing}
          toggle={toggle}
        />
      )}
    </>
  );
}
