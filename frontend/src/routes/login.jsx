import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Login } from '../features/Entry/Login.jsx'
import { useContext } from 'react'
import { CurrentUserContext } from './__root.jsx'

export const Route = createFileRoute('/login')({
    component: () => {
        const {
            currentUser,
            setCurrentUser
        } = useContext(CurrentUserContext);

        const navigate = useNavigate();
        if (currentUser) {
            navigate({ to: '/' })
        }

        return <Login />
    },
})

