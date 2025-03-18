import { CLOUDINARY_CONFIG } from '../config.js';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Takes the public_id and creates an optimized URL for accessing the image.
 * @param {string} public_id - public_id of the user's profile picture
 * @returns {string} - optimized URL of the image
 */
export function getProfilePictureUrl(public_id) {
    cloudinary.config(CLOUDINARY_CONFIG);

    const url = cloudinary.url(public_id, {
        fetch_format: 'auto',
        quality: 'auto'
    });

    return url;
}
