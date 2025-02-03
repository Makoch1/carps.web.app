import { getPosts } from './getPosts.js'

// NOTE: as of now, all posts will be supplied the same set of comments
const mockComments = [
    {
        comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
        upvotes: 12,
        user: {
            username: '@panda123',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
        upvotes: 19,
        user: {
            username: '@p1234',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        upvotes: 2,
        user: {
            username: '@rando3',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
        upvotes: 1,
        user: {
            username: '@testuser3',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
]

export function getPostDetails(postId) {
    // get all posts from getPosts, grab the correct one using postId, and copy the values
    // and append the comments
    const postDetails = {
        ...getPosts()[postId - 1], // spread syntax copies the data
        comments: mockComments,
    }

    return postDetails
}
