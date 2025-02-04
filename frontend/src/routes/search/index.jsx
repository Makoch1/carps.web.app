import { createFileRoute } from '@tanstack/react-router'
import { PostFeed } from '../../features/PostFeed/PostFeed.jsx'
import { getPosts } from '../../utils/getPosts.js'

export const Route = createFileRoute('/search/')({
    // defines what to do with the search params before getting passed to loader
    validateSearch: (search) => {
        const start = search.start ? search.start : '';
        const end = search.end ? search.end : '';
        const page = search.page ? search.page : 1;
        const filters = search.filters ? search.filters : [];

        return ({
            start,
            end,
            page,
            filters,
        })
    },
    component: () => {
        const { start, end, page, filters } = Route.useSearch()
        const posts = getPosts(start, end, page, filters);

        return <PostFeed posts={posts} />
    },
})

