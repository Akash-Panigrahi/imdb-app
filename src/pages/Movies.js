import { Box, Button, IconButton, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Add, Delete, Edit } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import DeleteMovieConfirmationDialog from '../components/DeleteMovieConfirmationDialog';
import Layout from '../components/Layout';

const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'calories', label: 'Director' },
    { id: 'fat', label: 'Genres' },
    { id: 'carbs', label: 'Popularity' },
    { id: 'protein', label: 'IMDB score' },
    { id: '', label: 'Actions' }
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function Movies() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState({});
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        const url = new URL(process.env.REACT_APP_BASE_URL + '/movie');
        const reqData = {
            start: page * 20,
            length: rowsPerPage
        };
        url.search = new URLSearchParams(reqData).toString();

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovies(data.movies);
                setTotalPages(data.totalMovies);
            });
    }, [page, rowsPerPage, forceUpdate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleMovieDelete = (deleteMovie) => {
        setMovieToDelete(deleteMovie);
        setShowDeleteDialog(true);
    }

    const deleteMovie = (movie) => {
        fetch(process.env.REACT_APP_BASE_URL + '/movie/' + movie._id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowDeleteDialog(false);
                setForceUpdate(forceUpdate + 1);
            })
            .catch(error => {
                console.error(error);
                setShowDeleteDialog(false);
            });
    };

    const closeDeleteDialog = () => {
        setShowDeleteDialog(false);
    };

    return (
        <Layout>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography component="h1" variant="h3">
                    Movies
                </Typography>
                <Button variant="outlined" color="primary" startIcon={<Add />}>
                    Add Movie
                </Button>
            </Box>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            size="medium"
                        >
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                        >
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movies.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell component="th" id={labelId} scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.director}</TableCell>
                                            <TableCell>{row.genres.join(', ')}</TableCell>
                                            <TableCell>{row['99popularity']}</TableCell>
                                            <TableCell>{row.imdb_score}</TableCell>
                                            <TableCell>
                                                <IconButton size="small" color="primary">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton size="small" color="secondary" onClick={() => handleMovieDelete(row)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={totalPages}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            {/* Dialog */}
            {showDeleteDialog && <DeleteMovieConfirmationDialog movie={movieToDelete} deleteMovie={deleteMovie} closeDeleteDialog={closeDeleteDialog} />}
        </Layout>
    )
}
