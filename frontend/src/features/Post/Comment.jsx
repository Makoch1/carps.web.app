// Comment.jsx

import { UserIcon } from '../../components/UserIcon.jsx'

export function Comment({ commentDetails }) {
    return (
        <div className="d-flex gap-3 my-2">
            <UserIcon userIcon={commentDetails.user.userIcon} />
            <div>
                <div className="d-flex gap-2 align-items-center">
                    <p className="fw-bold m-0">{commentDetails.user.username}</p>
                    <p className="text-muted m-0 small">{commentDetails.timestamp}</p>
                </div>
                <p className="m-0">{commentDetails.comment}</p>
                <div className="d-flex gap-2">
                    <button className='btn btn-sm bg-transparent'>
                        <i className='bi bi-hand-thumbs-up'></i> {commentDetails.upvotes}
                    </button>
                </div>
            </div>
        </div>
    )
}