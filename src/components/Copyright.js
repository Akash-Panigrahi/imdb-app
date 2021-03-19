import { Typography } from "@material-ui/core";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            IMDB
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
