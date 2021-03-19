import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const isLoginPage = window.location.pathname === '/login';
    const isAuthenticated = sessionStorage.getItem('token');

    const logout = () => {
        sessionStorage.removeItem('token');
        history.push('/');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title} align="left">
                    IMDB
                </Typography>
                {!(isLoginPage || isAuthenticated) && <Link
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                >
                    Login
                </Link>}
                {isAuthenticated && <Link
                    onClick={logout}
                    color="inherit"
                >
                    Logout
                </Link>}
            </Toolbar>
        </AppBar>
    );
}