import { v4 as uuid } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CONFIG } from '../config.js';

/**
 * Uploads user's profile picture to cloudinary, and returns public_id of the image.
 * @param { string } imgPath - path of the img file the user uploaded
 * @param { string } [previousId=''] - public_id of previous profile picture (for edits)
 * @returns {string} public id of the profile picture. empty '' if there was an error.
 */
export async function uploadProfilePicture(imgPath, previousId = '') {
    cloudinary.config(CLOUDINARY_CONFIG);

    const uploadResult = await cloudinary.uploader
        .upload(
            imgPath, { folder: 'profile-pictures', public_id: uuid() }
        )
        .catch(_ => {
            return ''
        })

    // remove previous image if applicable
    if (previousId) {
        await cloudinary.uploader.destroy(previousId);
    }

    return uploadResult.public_id;
}
