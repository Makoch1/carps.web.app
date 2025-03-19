import axios from "axios";
import { BACKEND_BASE_URL } from "./constants";

export async function getPostDetails(postId) {
    const postResponse = await axios({
        method: 'get',
        baseURL: BACKEND_BASE_URL,
        url: `posts/${postId}`
    })

    const commentsResponse = await axios({
        method: 'get',
        baseURL: BACKEND_BASE_URL,
        url: `comments/${postId}/comment`
    })

    const postDetails = await postResponse.data;
    postDetails.comments = await commentsResponse.data; // TODO: once comments are done, add another req

    return await postDetails;
}
