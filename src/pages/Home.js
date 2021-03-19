import { Box } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from "react";
import GenreList from "../components/GenreList";
import Layout from "../components/Layout";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import SortFilter from "../components/SortFilter";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [genres, setGenres] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [orderBy, setOrderBy] = useState('asc');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + '/genre')
            .then(res => res.json())
            .then(data => setGenres(data.map(genre => {
                genre.selected = false;
                return genre;
            })));
    }, []);

    useEffect(() => {
        const url = new URL(process.env.REACT_APP_BASE_URL + '/movie');
        const reqData = {
            start: (page - 1) * 20,
            sortBy,
            orderBy,
            search,
            genres: genres.filter(genre => genre.selected).map(genre => genre.name).join()
        };
        url.search = new URLSearchParams(reqData).toString();

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovies(data.movies);

                // calculate pages with movies count
                // default length is 20
                setTotalPages(Math.ceil(data.totalMovies / 20));
            });
    }, [page, sortBy, orderBy, search, genres]);

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
        setGenres(genres.map(genre => {
            if (genre.name === genreName) {
                genre.selected = true;
            }
            return genre;
        }));
    }

    const removeGenre = (genreName) => {
        setGenres(genres.map(genre => {
            if (genre.name === genreName) {
                genre.selected = false;
            }
            return genre;
        }));
    }

    return (
        <Layout>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Search search={search} handleSearchChange={handleSearchChange} />
                <SortFilter sortBy={sortBy} handleSortChange={handleSortChange} orderBy={orderBy} handleOrderChange={handleOrderChange} />
            </Box>
            <GenreList genres={genres} addGenre={addGenre} removeGenre={removeGenre} />
            <Box display="flex" alignItems="center" justifyContent="center">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
            <MovieList movies={movies} />
            <Box display="flex" alignItems="center" justifyContent="center">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
        </Layout>
    )
}
