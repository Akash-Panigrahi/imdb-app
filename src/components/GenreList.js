import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function GenreList({
  genres,
  selectedGenres,
  addGenre,
  removeGenre,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {genres.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          color={selectedGenres.has(genre) ? "primary" : undefined}
          onClick={() => addGenre(genre)}
          onDelete={
            selectedGenres.has(genre) ? () => removeGenre(genre) : undefined
          }
        />
      ))}
    </div>
  );
}
