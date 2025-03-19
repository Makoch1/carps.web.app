import axios from "axios";
import { BACKEND_BASE_URL } from "./constants";

export async function getPostDetails(postId) {
    const response = await axios({
        method: 'get',
        baseURL: BACKEND_BASE_URL,
        url: `posts/${postId}`
    })

    const postDetails = await response.data;
    postDetails.comments = []; // TODO: once comments are done, add another req

    return await postDetails;
}
