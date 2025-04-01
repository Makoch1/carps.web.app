import { createFileRoute } from '@tanstack/react-router'
import { getPostDetails } from '../../utils/getPostDetails.js';
import { EditPost } from '../../features/Edit/EditPost.jsx';

export const Route = createFileRoute('/edit/$postId')({
    loader: ({ params: { postId } }) => {
        return getPostDetails(postId);
    },
    component: RouteComponent,
})

function RouteComponent() {
    const postDetails = Route.useLoaderData();
    return <EditPost currentDetails={postDetails} />
}
