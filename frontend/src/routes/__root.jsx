import { createContext, useEffect, useState } from 'react';
import { Navbar } from '../features/Navbar/Navbar.jsx'
import { createRootRoute, Outlet } from "@tanstack/react-router";
import axios from 'axios';
import { BACKEND_BASE_URL } from '../utils/constants.js';

export const Route = createRootRoute({
    component: RootComponent
})

export const CurrentUserContext = createContext(null);

function RootComponent() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/auth`)
            .then(res => setCurrentUser(res.data))
            .catch(_ => setCurrentUser(null))
    }, [])

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser
            }}>
            <Navbar />
            <Outlet />
        </CurrentUserContext.Provider>
    )
}
