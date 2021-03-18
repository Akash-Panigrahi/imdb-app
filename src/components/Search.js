import { Box, Button, TextField } from '@material-ui/core'
import { useRef } from 'react';

export default function Search({ search, handleSearchChange }) {
    const searchRef = useRef(search);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearchChange(searchRef.current.value);
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField variant="outlined" inputRef={searchRef} defaultValue={search} />
            <Button variant="contained" color="primary" type="submit">
                Search
            </Button>
        </Box>
    )
};
