import { createContext, useState } from 'react';
import { Navbar } from '../features/Navbar/Navbar.jsx'
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent
})

export const CurrentUserContext = createContext(null);

function RootComponent() {
    const [currentUser, setCurrentUser] = useState(null);

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
