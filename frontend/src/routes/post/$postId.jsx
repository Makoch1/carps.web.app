import { createFileRoute } from '@tanstack/react-router'
import { getPostDetails } from '../../utils/getPostDetails.js'
import { Post } from '../../features/Post/Post.jsx'

export const Route = createFileRoute('/post/$postId')({
    loader: ({ params: { postId } }) => {
        return getPostDetails(postId);
    },
    component: RouteComponent,
})

function RouteComponent() {
    const postDetails = Route.useLoaderData();
    return <Post postDetails={postDetails} />
}
