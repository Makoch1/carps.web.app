import { createFileRoute } from '@tanstack/react-router'
import { CreatePost } from '../../features/CreatePost/CreatePost.jsx'

export const Route = createFileRoute('/post/create')({
    component: CreatePost,
})
