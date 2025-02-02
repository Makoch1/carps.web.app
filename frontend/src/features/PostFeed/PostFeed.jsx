import { PostPreview } from './PostPreview.jsx'

export function PostFeed({ posts }) {
    return (
        <>
            <div className='w-100 h-auto ms-auto'>
                {
                    posts.map((post, index) => <PostPreview postDetails={post} key={index} />)
                }
            </div>
        </>
    )
}
