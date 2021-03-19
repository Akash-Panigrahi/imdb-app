import { useState } from "react";
import AddEditMovie from "../components/AddEditMovie";
import Layout from "../components/Layout";

export default function AddMovie() {
  const [movie, setMovie] = useState({
    name: { value: "", error: "" },
    director: { value: "", error: "" },
    genres: { value: [], error: "" },
    popularity: { value: 1, error: "" },
  });

  const handleMovieSubmit = (event) => {
    event.preventDefault();

    fetch(process.env.REACT_APP_BASE_URL + "/movie", {
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
        operation="add"
      />
    </Layout>
  );
}
