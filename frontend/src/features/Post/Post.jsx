import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../routes/__root.jsx';
import { useUpvote } from '../../hooks/useUpvote.js'
import { UserIcon } from '../../components/UserIcon.jsx'
import { Comment } from './Comment.jsx'
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/constants.js';

export function Post({ postDetails }) {
    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext)

    const [
        upvote,
        upvoteColor,
        handleUpvote,
        handleDownvote
    ] = useUpvote(postDetails._id, 'post', postDetails.userVote);
    const [comment, setComment] = useState('');
    const [saved, setSaved] = useState(postDetails.isSaved);
    const navigate = useNavigate();
    const { history } = useRouter();

    // remove the user's upvote from the totalUpvotes, otherwise it is counted twice
    const upvotes = postDetails.upvotes - postDetails.userVote;

    function handleSave() {
        axios({
            method: 'post',
            baseURL: BACKEND_BASE_URL,
            url: '/posts/save',
            data: {
                postID: postDetails._id,
            }
        })
            .then(_ => setSaved(!saved))
            .catch(err => {
                if (err.status === 401 || err.status === 403) {
                    navigate({ to: '/login' })
                }
            })
    }

    function handleDelete() {
        axios({
            method: 'delete',
            baseURL: BACKEND_BASE_URL,
            url: `posts/${postDetails._id}`
        })
            .then(_ => navigate({ to: '/' }))
            .catch(_ => window.alert("Delete Failed!"))
    }

    function handleComment() {
        axios({
            method: 'post',
            baseURL: BACKEND_BASE_URL,
            url: `comments/${postDetails._id}/comment`,
            data: {
                comment: comment
            }
        })
            .then(_ => {
                setComment('');
                navigate({ to: `/post/${postDetails._id}` })
            })
            .catch(err => {
                if (err.status === 401 || err.status === 403) {
                    navigate({ to: '/login' })
                }
            })
    }

    return (
        <div className="w-50 mx-auto mt-3">
            <div className="d-flex gap-3 align-items-center">
                <button
                    className='btn btn-primary bg-transparent rounded-circle'
                    onClick={() => history.go(-1)}>
                    <i className='bi bi-arrow-return-left'></i>
                </button>
                <Link to={`/profile/${postDetails.user._id}`} className='d-flex gap-1 align-items-center fs-5 fw-bold fst-italic'>
                    <UserIcon userIcon={postDetails.user.picture} />
                    <p className='text-white text-decoration-none m-0'>{postDetails.user.username}</p>
                </Link>
            </div>
            <h1 className='my-3 fs-2 fw-bold'>
                {postDetails.start}
                {
                    postDetails.isOneWay ?
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
                    <span className='mx-2 fw-bold' style={{ color: upvoteColor() }}>{upvotes + upvote}</span>
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
                {
                    currentUser && // only display this when user is logged in
                    <button
                        className={`btn btn-${saved ? 'primary' : 'secondary'} rounded-pill fw-bold`}
                        onClick={handleSave}>
                        <i className="bi bi-download me-2"></i>
                        Save
                    </button>
                }
                {
                    // only display edit when user is the owner of the post
                    currentUser && currentUser.uid === postDetails.user._id &&
                    <Link
                        className='btn btn-secondary rounded-pill fw-bold'
                        to={`/edit/${postDetails._id}`}>
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit
                    </Link>
                }
                {
                    // post can be deleted by owner OR admin
                    currentUser && (currentUser.uid === postDetails.user._id || currentUser.isAdmin) &&
                    <button
                        className='btn btn-secondary rounded-pill text-danger fw-bold'
                        onClick={handleDelete}>
                        <i className="bi bi-trash me-2"></i>
                        Delete
                    </button>
                }
            </div>
            {/* Comments Section */}
            <form className='my-3 border border-primary rounded'>
                <textarea
                    className='form-control bg-transparent border-0 h-50 mb-0 shadow-none'
                    value={comment}
                    placeholder='Enter comment here...'
                    onChange={e => setComment(e.target.value)}>
                </textarea>
                <div className='d-flex flex-row-reverse'>
                    <button
                        className='btn btn-primary px-4 py-1 m-2 rounded-pill'
                        type='button'
                        onClick={handleComment}>
                        Post
                    </button>
                    <button
                        className='btn btn-secondary px-4 py-1 my-2 rounded-pill'
                        type='button'
                        onClick={() => setComment('')}>
                        Clear
                    </button>
                </div>
            </form>

            <div className='mt-3'>
                {postDetails.comments.map((comment, index) => (
                    <Comment key={index} commentDetails={comment} />
                ))}
            </div>
        </div>
    )
}
