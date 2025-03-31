import { Link, useNavigate } from '@tanstack/react-router';
import { UserIcon } from '../../components/UserIcon.jsx'
import { useUpvote } from '../../hooks/useUpvote.js'
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/constants.js';
import { useState } from 'react';

export function Comment({ commentDetails }) {
    const [
        upvote,
        upvoteColor,
        handleUpvote,
        handleDownvote
    ] = useUpvote(commentDetails._id, 'comment', commentDetails.userVote);

    const [edit, setEdit] = useState(commentDetails.comment);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    function handleEdit() {
        axios({
            method: 'put',
            baseURL: BACKEND_BASE_URL,
            url: `comments/${commentDetails.parentPost}/comment/${commentDetails._id}`
        })
            .then(_ => location.reload())
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
            url: `comments/${commentDetails.parentPost}/comment/${commentDetails._id}`
        })
            .then(_ => location.reload())
            .catch(err => {
                if (err.status === 401 || err.status === 403) {
                    navigate({ to: '/login' })
                }
            })
    }

    const upvotes = commentDetails.upvotes - commentDetails.userVote;

    return (
        <div>
            <div className="d-flex gap-3 my-3">
                <UserIcon userIcon={commentDetails.user.picture} />
                <div>
                    <div className="d-flex gap-2 align-items-center">
                        <p className="fw-bold m-0">{commentDetails.user.username}</p>
                        <p className="text-muted m-0 small">{commentDetails.timestamp}</p>
                    </div>
                    {
                        editMode ?
                            (<div>
                                <input
                                    value={edit}
                                    onChange={e => setEdit(e.value)}
                                    type='text' />
                                <button onClick={handleEdit}>Save</button>
                            </div>) :
                            <p className="m-0">{commentDetails.comment}</p>
                    }
                    <div className='d-flex gap-2'>
                        <div className="d-flex gap-1 align-items-center">
                            <button
                                className='btn bg-transparent btn-outline-primary border-0'
                                onClick={handleUpvote}>
                                <i className='bi bi-chevron-up'></i>
                            </button>
                            <span style={{ color: upvoteColor() }}>{upvotes + upvote}</span>
                            <button
                                className='btn bg-transparent btn-outline-primary border-0'
                                onClick={handleDownvote}>
                                <i className='bi bi-chevron-down'></i>
                            </button>
                        </div>
                        <button
                            className='btn btn-secondary bg-transparent btn-sm rounded-pill'
                            onClick={() => setEditMode(!editMode)}>
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit
                        </button>
                        <button
                            className='btn btn-secondary bg-transparent btn-sm rounded-pill text-danger'
                            onClick={handleDelete}>
                            <i className="bi bi-trash me-2"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className='ms-5 border-start border-primary'>
                {
                    commentDetails.children &&
                    commentDetails.children.map(childComment => <Comment commentDetails={childComment} />)
                }
            </div>
        </div >

    )
}
