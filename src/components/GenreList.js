import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function GenreList({ genres, addGenre, removeGenre }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {genres.map(genre =>
                <Chip key={genre.name} label={genre.name} color={genre.selected ? 'primary' : undefined} onClick={() => addGenre(genre.name)} onDelete={genre.selected ? () => removeGenre(genre.name) : undefined} />
            )}
        </div>
    )
}
