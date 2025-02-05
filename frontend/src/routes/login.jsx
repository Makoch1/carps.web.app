import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../features/Entry/Login.jsx'

export const Route = createFileRoute('/login')({
    component: Login,
})

