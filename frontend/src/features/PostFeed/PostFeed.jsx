import { PostPreview } from './PostPreview.jsx'

export function PostFeed({ posts }) {
    return (
        <>
            <div className='w-100 h-auto ms-auto'>
                {
                    posts.map(post => <PostPreview postDetails={post} key={post._id} />)
                }
            </div>
        </>
    )
}
