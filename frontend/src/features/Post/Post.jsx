import { useState } from 'react';
import { useUpvote } from '../../hooks/useUpvote.js'
import { UserIcon } from '../../components/UserIcon.jsx'
import { Comment } from './Comment.jsx'
import { Link } from '@tanstack/react-router';

export function Post({ postDetails }) {
    const [upvote, upvoteColor, handleUpvote, handleDownvote] = useUpvote();
    const [saved, setSaved] = useState(false); // TODO: next time, instead of false, check backend if post is saved

    function handleSave() {
        // once backend is done, add a call to backend
        setSaved(!saved)
    }

    function handleDelete() {
        // TODO: change to a backend call
        window.alert("Are you sure about that?")
    }

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
            <h1 className='my-3 fs-2 fw-bold'>
                {postDetails.start}
                {
                    postDetails.oneWay ?
                        <i className='mx-2 bi bi-arrow-right'></i> :
                        <i className='mx-2 bi bi-arrow-left-right'></i>
                }
                {postDetails.destination}
            </h1>
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
                    <button
                        className='btn bg-transparent btn-outline-primary border-0'
                        onClick={handleUpvote}>
                        <i className='bi bi-chevron-up'></i>
                    </button>
                    <span className='mx-2 fw-bold' style={{ color: upvoteColor() }}>{postDetails.upvotes + upvote}</span>
                    <button
                        className='btn bg-transparent btn-outline-primary border-0'
                        onClick={handleDownvote}>
                        <i className='bi bi-chevron-down'></i>
                    </button>
                </div>
                <div className='d-flex gap-2 px-4 align-items-center bg-secondary rounded-pill'>
                    <i className='bi bi-chat-left small'></i>
                    <span className='fw-bold'>{postDetails.comments.length}</span>
                </div>
                <button
                    className={`btn btn-${saved ? 'primary' : 'secondary'} rounded-pill fw-bold`}
                    onClick={handleSave}>
                    <i className="bi bi-download me-2"></i>
                    Save
                </button>
                <Link
                    className='btn btn-secondary rounded-pill fw-bold'
                    to={`/edit/${postDetails.postId}`}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit
                </Link>
                <button
                    className='btn btn-secondary rounded-pill text-danger fw-bold'
                    onClick={handleDelete}>
                    <i className="bi bi-trash me-2"></i>
                    Delete
                </button>
            </div>
            {/* Comments Section */}
            <div className='mt-3'>
                {postDetails.comments.map((comment, index) => (
                    <Comment key={index} commentDetails={comment} />
                ))}
            </div>
        </div>
    )
}
