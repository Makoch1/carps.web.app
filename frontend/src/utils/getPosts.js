import axios from "axios";
import { BACKEND_BASE_URL } from "./constants";

export async function getPosts(start = "", end = "", page = 1, sort = 'popular', filters = []) {
    try {
        const postsResponse = await axios({
            method: 'get',
            baseURL: BACKEND_BASE_URL,
            url: '/posts',
            params: {
                start: start,
                destination: end,
                page: page,
                sort: sort,
                tags: filters
            },
            paramsSerializer: {
                indexes: false
            }
        })

        return await postsResponse.data;
    } catch {
        return [];
    }
}
