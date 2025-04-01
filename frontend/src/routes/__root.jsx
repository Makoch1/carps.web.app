import { createContext, useState } from 'react';
import { Navbar } from '../features/Navbar/Navbar.jsx'
import { createRootRoute, Outlet } from "@tanstack/react-router";
import axios from 'axios';
import { BACKEND_BASE_URL } from '../utils/constants.js';

export const Route = createRootRoute({
    loader: () => {
        return getAuth()
    },
    component: RootComponent
})

export const CurrentUserContext = createContext(null);

function RootComponent() {
    const userData = Route.useLoaderData();
    const [currentUser, setCurrentUser] = useState(userData);

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

async function getAuth() {
    try {
        const res = await axios.get(`${BACKEND_BASE_URL}/auth`);
        return await res.data;
    } catch {
        return null
    }
}
