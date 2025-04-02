import { useNavigate } from '@tanstack/react-router'
import { PostPreview } from './PostPreview.jsx'

export function PostFeed({ posts, page }) {
    const navigate = useNavigate();

    function handleNextPage() {
        navigate({
            to: '.',
            search: (prev) => ({ ...prev, page: prev.page + 1 })
        })
    }

    function handlePrevPage() {
        navigate({
            to: '.',
            search: (prev) => ({ ...prev, page: prev.page - 1 })
        })
    }

    return (
        <>
            <div className='w-100 h-auto ms-auto'>
                {
                    posts.map(post => <PostPreview postDetails={post} key={post._id} />)
                }
                <div className='d-flex gap-3'>
                    {
                        page > 1 &&
                        <button
                            className='btn btn-outline-primary text-white rounded-sm'
                            onClick={handlePrevPage}>
                            {'<- Prev page'}
                        </button>
                    }
                    {
                        posts.length === 15 && page && // 15 is the limit per page
                        <button
                            className='btn btn-outline-primary text-white rounded-sm'
                            onClick={handleNextPage}>
                            {'Next page ->'}
                        </button>
                    }
                </div>
            </div>
        </>
    )
}
