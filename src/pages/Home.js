import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";
import GenreList from "../components/GenreList";
import Layout from "../components/Layout";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import SortFilter from "../components/SortFilter";
import environment from "../environments";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [orderBy, setOrderBy] = useState("asc");
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(new Set());

  useEffect(() => {
    fetch(environment.baseUrl + "/genre")
      .then((res) => res.json())
      .then((data) => setGenres(data.map((genre) => genre.name)));
  }, []);

  useEffect(() => {
    const url = new URL(environment.baseUrl + "/movie");
    const reqData = {
      start: (page - 1) * 20,
      sortBy,
      orderBy,
      search,
      genres: Array.from(selectedGenres),
    };
    url.search = new URLSearchParams(reqData).toString();

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);

        // calculate pages with movies count
        // default length is 20
        setTotalPages(Math.ceil(data.totalMovies / 20));
      });
  }, [page, sortBy, orderBy, search, selectedGenres]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const addGenre = (genreName) => {
    setPage(1);
    setSelectedGenres(new Set([...Array.from(selectedGenres), genreName]));
  };

  const removeGenre = (genreName) => {
    const newSet = new Set(selectedGenres);
    newSet.delete(genreName);
    setSelectedGenres(newSet);
  };

  return (
    <Layout>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Search search={search} handleSearchChange={handleSearchChange} />
        <SortFilter
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          orderBy={orderBy}
          handleOrderChange={handleOrderChange}
        />
      </Box>
      <Box mb={4}>
        <GenreList
          genres={genres}
          selectedGenres={selectedGenres}
          addGenre={addGenre}
          removeGenre={removeGenre}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
      <MovieList movies={movies} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Layout>
  );
}
