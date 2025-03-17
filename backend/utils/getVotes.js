import { PostVote } from '../models/postvote.js';
import { CommentVote } from '../models/commentvote.js';

/**
 * Counts the total votes of a post / comment : [upvotes - downvotes]
 *
 * @param { 'post' | 'comment' } modelName - Which model is going to be queried
 * @param { string } contentID - ID of the post / comment
 * @param { number } total votes
 */
const getVotes = async (modelName, contentID) => {
    const Model = {
        'post': PostVote,
        'comment': CommentVote,
    }[modelName];

    const modelFilter = {
        'post': { post: contentID },
        'comment': { comment: contentID },
    }[modelName];

    const upvotes = await Model.countDocuments({ ...modelFilter, impression: true }).exec();
    const downvotes = await Model.countDocuments({ ...modelFilter, impression: false }).exec();

    return upvotes - downvotes;
}

export { getVotes };
