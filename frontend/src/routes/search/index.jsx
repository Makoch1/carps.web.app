import { createFileRoute } from '@tanstack/react-router'
import { PostFeed } from '../../features/PostFeed/PostFeed.jsx'
import { getPosts } from '../../utils/getPosts.js'

export const Route = createFileRoute('/search/')({
    // defines what to do with the search params before getting passed to loader
    loaderDeps: ({ search: { query, page, filters } }) => {
        const q = query ? query : '';
        const p = page ? page : 1;
        const f = filters ? filters : [];

        return {
            q,
            p,
            f,
        }
    },
    loader: async ({ deps: { query, page, filters } }) => {
        // replace with actual backend call
        return getPosts(query, page, filters);
    },
    component: () => {
        const posts = Route.useLoaderData();

        return <PostFeed posts={posts} />
    },
})

