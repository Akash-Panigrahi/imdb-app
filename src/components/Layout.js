import { Box } from '@material-ui/core'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Box m={4}>
            {children}
            </Box>
            <Footer />
        </>
    )
}
