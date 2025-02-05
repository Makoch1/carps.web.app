import { useUpvote } from '../../hooks/useUpvote.js'
import { Link } from "@tanstack/react-router";

export function PostPreview({ postDetails }) {
    const [userUpvote, upvoteColor, handleUpvote, handleDownvote] = useUpvote();

    // gets only the first two tags
    const tags = postDetails.tags
        .filter((_, index) => index < 2)
        .map((tag, index) =>
            <span className="badge rounded-pill text-bg-primary fs-6" key={index}>{tag}</span>
        )

    return (
        <div className="d-flex my-5" >
            <div className='w-25 d-flex'>
                <div className="mx-3 my-auto">
                    <p className="w-100 m-0 text-center fs-4 fw-bold" style={{ color: upvoteColor() }}>
                        {postDetails.upvotes + userUpvote}
                    </p>
                    <div>
                        <button className="p-1 btn bg-transparent btn-outline-primary border-0" onClick={handleUpvote}>
                            <i class="bi bi-chevron-up"></i>
                        </button>
                        <button className="p-1 btn bg-transparent btn-outline-primary border-0" onClick={handleDownvote}>
                            <i class="bi bi-chevron-down"></i>
                        </button>
                    </div>
                </div>
                <div className="me-3">
                    <div className="d-flex gap-2">
                        {tags}
                    </div>
                    <div className="d-flex">
                        {
                            postDetails.user.userIcon ?
                                <img className="h-75" src={postDetails.user.userIcon} /> :
                                <i className="bi bi-person-circle fs-1 me-2"></i>
                        }
                        <div className="d-flex flex-column">
                            <span className="fs-5">{postDetails.user.username}</span>
                            <span className="fw-light fst-italic">{postDetails.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-50 position-relative">
                <span className="badge rounded-pill w-100 text-bg-primary text-start fs-4 fw-bold">
                    <span className='text-uppercase'>{postDetails.start}</span>
                    {
                        postDetails.oneWay ?
                            <i class="mx-2 bi bi-arrow-right"></i> :
                            <i class="mx-2 bi bi-arrow-left-right"></i>
                    }
                    <span className='text-uppercase'>{postDetails.destination}</span>
                </span>
                <p className="ps-3 text-truncate">{postDetails.description}</p>
                <Link className="stretched-link" to={`/post/${postDetails.postId}`}></Link>
            </div>
        </div>
    )
}
