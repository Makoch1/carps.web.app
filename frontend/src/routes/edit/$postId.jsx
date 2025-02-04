import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/$postId')({
    loader: ({ params: { postId } }) => {
        return getPostDetails(postId);
    },
    component: RouteComponent,
})

// TODO: once edit component is done, insert here
function RouteComponent() {
    return <div>Hello "/edit/$postId"!</div>
}
