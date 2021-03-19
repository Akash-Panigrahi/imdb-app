import { Box } from '@material-ui/core';
import Copyright from './Copyright';

export default function Footer() {
    return (
        <Box mt={8} component="footer">
            <Copyright />
        </Box>
    )
}
