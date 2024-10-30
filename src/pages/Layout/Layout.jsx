import React from 'react'
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return (
        <Container fixed>
            <Outlet />
        </Container>

    )
}

export default Layout
