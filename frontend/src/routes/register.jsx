import { createFileRoute } from '@tanstack/react-router'
import { Register } from '../features/Entry/Register.jsx'

export const Route = createFileRoute('/register')({
    component: Register,
})

