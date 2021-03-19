import { Box, FormControl, MenuItem, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function SortFilter({ sortBy, handleSortChange, orderBy, handleOrderChange }) {
    const classes = useStyles();

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Box mr={2}>
                <Typography variant="h6" component="span">
                    Sort By
                </Typography>
            </Box>
            <FormControl variant="outlined" className={classes.formControl} size="small">
                <Select
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <MenuItem value="99popularity">Popularity</MenuItem>
                    <MenuItem value="director">Director</MenuItem>
                    <MenuItem value="name">Movie</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl} size="small">
                <Select
                    value={orderBy}
                    onChange={handleOrderChange}
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
