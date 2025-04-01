import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Register } from '../features/Entry/Register.jsx'
import { useContext } from 'react'
import { CurrentUserContext } from './__root.jsx'

export const Route = createFileRoute('/register')({
    component: () => {
        const {
            currentUser,
            setCurrentUser
        } = useContext(CurrentUserContext);

        const navigate = useNavigate();
        if (currentUser) {
            navigate({ to: '/' })
        }

        return <Register />
    }
})

