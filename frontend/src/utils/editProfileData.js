import axios from "axios";
import { BACKEND_BASE_URL } from './constants.js'

// TODO: once auth is done, maybe shouldnt be userId anymore, but session cookie or smth idk
export async function editProfileData(userId, newDescription) {
    const res = await axios.put(`${BACKEND_BASE_URL}/users/`, {
        id: userId,
        description: newDescription
    })

    return res.status === 200;
}
