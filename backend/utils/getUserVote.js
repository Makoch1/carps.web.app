import { PostVote } from '../models/postvote.js';
import { CommentVote } from '../models/commentvote.js';

/**
 * Checks postVote / commentVote if user has upvoted/downvoted the specified content before.
 *
 * @param { 'post' | 'comment' } modelName - Which model is going to be queried
 * @param { string } contentID - ID of the post / comment
 * @returns { number } total votes
 */
async function getUserVote(modelName, userID, contentID) {
    if (userID === '') {
        return 0;
    }

    const Model = {
        'post': PostVote,
        'comment': CommentVote,
    }[modelName];

    const modelFilter = {
        'post': { post: contentID },
        'comment': { comment: contentID },
    }[modelName];

    const vote = await Model.findOne({ user: userID, ...modelFilter }, 'impression').exec();

    if (!vote) {
        return 0;
    }

    switch (vote.impression) {
        case true: return 1;
        case false: return -1;
    }
}

export { getUserVote };
