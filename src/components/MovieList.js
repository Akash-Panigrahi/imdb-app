import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Chip, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderColor: 'violet'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    movies: {
        padding: 20
    },
    genres: {
        marginBottom: -16,
        marginTop: 16
    },
    genre: {
        marginBottom: 8,
        marginRight: 8
    }
});

export default function MovieList({ movies }) {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.movies}>
            {movies.map(movie =>
                <Grid item xs={12} sm={6} md={4} key={movie._id}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {movie.name}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary">
                                {movie.director}
                            </Typography>
                            <div className={classes.genres}>
                                {movie.genre.map(genre => <Chip className={classes.genre} key={genre} label={genre} />)}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}
