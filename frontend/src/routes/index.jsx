import { createFileRoute } from "@tanstack/react-router";
import { PostFeed } from '../features/PostFeed/PostFeed.jsx'
import { getPosts } from '../utils/getPosts.js'

export const Route = createFileRoute('/')({
    loader: () => {
        // ONCE BACKEND IS FINISHED, THIS IS WHERE WE MAKE THE REQUEST,
        // example: return axios.get('posts/')
        // For now, mock data is loaded
        return getPosts();
    },
    component: () => {
        // Retrieves data from the loader
        const loadedPosts = Route.useLoaderData();

        return (
            <div className="d-flex">
                <div className="w-25">

                </div>
                <div className="w-75">
                    <PostFeed posts={loadedPosts} />
                </div>
            </div>
        )
    }
})
