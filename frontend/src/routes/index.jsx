import { createFileRoute } from "@tanstack/react-router";
import { PostFeed } from '../features/PostFeed/PostFeed.jsx'
import { FilterSidebar } from '../features/PostFeed/FilterSidebar.jsx'
import { getPosts } from '../utils/getPosts.js'

export const Route = createFileRoute('/')({
    // defines what to do with the search params before getting passed to loader
    validateSearch: (search) => {
        const start = search.start ? search.start : '';
        const end = search.end ? search.end : '';
        const page = search.page ? search.page : 1;
        const sort = search.sort ? search.sort : '';
        const filters = search.filters ? search.filters : [];

        return ({
            start,
            end,
            page,
            sort,
            filters,
        })
    },
    component: () => {
        const { start, end, page, sort, filters } = Route.useSearch()
        const posts = getPosts(start, end, page, sort, filters);

        return (
            <div className="d-flex">
                <div className="w-25">
                    <FilterSidebar />
                </div>
                <div className="w-75">
                    <PostFeed posts={posts} />
                </div>
            </div>
        )
    }
})
