import { Navbar } from '../features/Navbar/Navbar.jsx'
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar />
            <Outlet />
        </>
    )
})
