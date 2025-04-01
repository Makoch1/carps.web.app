import axios from 'axios'
import { BACKEND_BASE_URL } from './constants.js'

export async function getProfileData(userId) {
    const res = await axios.get(`${BACKEND_BASE_URL}/users/${userId}`);

    if (res.data.picture === '') {
        res.data.picture = 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png';
    }

    res.data.userId = userId;

    return await res.data;
}
