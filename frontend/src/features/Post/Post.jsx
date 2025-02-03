import { UserIcon } from '../../components/userIcon.jsx'

export function Post({ postDetails }) {
    return (
        <div className="w-50 mx-auto mt-3">
            <div className="d-flex gap-3 align-items-end">
                <button className='btn btn-primary bg-transparent rounded-circle'>
                    <i className='bi bi-arrow-return-left'></i>
                </button>
                <div className='d-flex gap-1 align-items-center fs-5 fw-bold fst-italic'>
                    <UserIcon userIcon={postDetails.user.userIcon} />
                    <p className='m-0'>{postDetails.user.username}</p>
                </div>
            </div>
            <h1 className='my-3 fs-2 fw-bold'>{postDetails.title}</h1>
            <div className='d-flex flex-wrap gap-2'>
                {
                    postDetails.tags.map((tag, index) =>
                        <span
                            className='badge rounded-pill text-bg-primary fw-medium fs-6'
                            key={index}>
                            {tag}
                        </span>
                    )
                }
            </div>
            <p className='mt-1'>
                {postDetails.description}
            </p>
            <div className='d-flex gap-3'>
                <div className='d-flex align-items-center bg-secondary rounded-pill'>
                    <button className='btn bg-transparent btn-outline-primary border-0'>
                        <i className='bi bi-chevron-up'></i>
                    </button>
                    <span className='mx-2 fw-bold'>{postDetails.upvotes}</span>
                    <button className='btn bg-transparent btn-outline-primary border-0'>
                        <i className='bi bi-chevron-down'></i>
                    </button>
                </div>
                <div className='d-flex gap-2 px-4 align-items-center bg-secondary rounded-pill'>
                    <i className='bi bi-chat-left small'></i>
                    <span className='fw-bold'>{postDetails.comments.length}</span>
                </div>
                <button className='btn btn-secondary rounded-pill fw-bold'>
                    <i class="bi bi-download me-2"></i>
                    Save
                </button>
            </div>
            {/*  TODO: comments section goes here! */}
        </div>
    )
}
