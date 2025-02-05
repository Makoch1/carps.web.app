import { Link } from '@tanstack/react-router';
import { UserIcon } from '../../components/UserIcon.jsx'
import { useUpvote } from '../../hooks/useUpvote.js'

export function Comment({ commentDetails }) {
    const [upvote, upvoteColor, handleUpvote, handleDownvote] = useUpvote();

    return (
        <div className="d-flex gap-3 my-3">
            <UserIcon userIcon={commentDetails.user.userIcon} />
            <div>
                <div className="d-flex gap-2 align-items-center">
                    <p className="fw-bold m-0">{commentDetails.user.username}</p>
                    <p className="text-muted m-0 small">{commentDetails.timestamp}</p>
                </div>
                <p className="m-0">{commentDetails.comment}</p>
                <div className='d-flex gap-2'>
                    <div className="d-flex gap-1 align-items-center">
                        <button
                            className='btn bg-transparent btn-outline-primary border-0'
                            onClick={handleUpvote}>
                            <i className='bi bi-chevron-up'></i>
                        </button>
                        <span style={{ color: upvoteColor() }}>{commentDetails.upvotes + upvote}</span>
                        <button
                            className='btn bg-transparent btn-outline-primary border-0'
                            onClick={handleDownvote}>
                            <i className='bi bi-chevron-down'></i>
                        </button>
                    </div>
                    <button
                        className='btn btn-secondary bg-transparent btn-sm rounded-pill'
                        onClick={() => window.alert(`Edit comment`)}>
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit
                    </button>
                    <button
                        className='btn btn-secondary bg-transparent btn-sm rounded-pill text-danger'
                        onClick={() => window.alert(`Removing comment, are you sure?`)}>
                        <i className="bi bi-trash me-2"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div >
    )
}
