import axios from "axios";
import { BACKEND_BASE_URL } from './constants.js';

export async function register(username, password) {
    try {
        await axios.post(`${BACKEND_BASE_URL}/users/`, {
            username: username,
            password: password,
        });

        return true;
    } catch {
        return false;
    }
}
