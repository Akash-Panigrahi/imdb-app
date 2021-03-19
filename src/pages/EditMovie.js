import { useState } from "react";
import AddEditMovie from "../components/AddEditMovie";
import Layout from "../components/Layout";

export default function EditMovie() {
  const movieToEdit = JSON.parse(sessionStorage.getItem("movie-to-edit"));
  const [movie, setMovie] = useState({
    name: { value: movieToEdit.name, error: "" },
    director: { value: movieToEdit.director, error: "" },
    genres: { value: movieToEdit.genres, error: "" },
    popularity: { value: movieToEdit["99popularity"], error: "" },
  });

  const handleMovieSubmit = (event) => {
    event.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/movie/" + movieToEdit._id, {
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
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {});
  };

  return (
    <Layout>
      <AddEditMovie
        movie={movie}
        setMovie={setMovie}
        handleMovieSubmit={handleMovieSubmit}
        operation="edit"
      />
    </Layout>
  );
}
