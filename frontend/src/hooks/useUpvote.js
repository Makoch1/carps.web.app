import axios from "axios";
import { useContext, useState } from "react";
import { BACKEND_BASE_URL } from "../utils/constants";
import { useNavigate } from "@tanstack/react-router";
import { CurrentUserContext } from "../routes/__root";

/**
 * @param {string} userId - id of the current user
 * @param {string} contentId - id of the content
 * @param {'post' | 'comment'} [type='post'] - type of content being upvoted
 * @param {1 | 0 | -1} [initialValue=0] - initial value: for when it was already upvoted by user
 */
export function useUpvote(contentId, type, initialValue) {
    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);

    const [upvote, setUpvote] = useState(initialValue);
    const navigate = useNavigate();

    const handleUpvote = () => {
        if (!currentUser) {
            return navigate({ to: '/login' });
        }

        const userId = currentUser.uid;
        const newUpvote = upvote === 1 ? 0 : 1;

        upvoteApiRequest(userId, contentId, type, newUpvote)
            .then(_ => setUpvote(newUpvote))
            .catch(err => {
                if (err.status === 401 || err.status === 403) {
                    navigate({ to: '/login' });
                }
            })
    }
    const handleDownvote = () => {
        if (!currentUser) {
            return navigate({ to: '/login' });
        }

        const userId = currentUser.uid;
        const newUpvote = upvote === -1 ? 0 : -1;

        setUpvote(newUpvote);
        upvoteApiRequest(userId, contentId, type, newUpvote, navigate)
            .then(_ => setUpvote(newUpvote))
            .catch(err => {
                if (err.status === 401 || err.status === 403) {
                    navigate({ to: '/login' });
                }
            })
    }

    const upvoteColor = () => {
        switch (upvote) {
            case -1: return 'lightblue';
            case 0: return 'white';
            case 1: return 'orangered';
        }
    }

    return [
        upvote,
        upvoteColor,
        handleUpvote,
        handleDownvote,
    ]
}

function upvoteApiRequest(userId, contentId, type, upvote) {
    return axios({
        method: 'post',
        baseURL: BACKEND_BASE_URL,
        url: `votes/${type}`,
        data: {
            userID: userId,
            ...{
                'post': { postID: contentId },
                'comment': { commentID: contentId }
            }[type],
            vote: upvote
        }
    })
}
