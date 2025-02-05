import { getPosts } from './getPosts.js'

// NOTE: as of now, all posts will be supplied the same set of comments
const mockComments = [
    {
        comment: 'Up! Gusto ko rin malaman!',
        upvotes: 25,
        user: {
            username: '@rebecca118',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        commet: 'I am not familiar with that area. I am sure you can just ask around there. They will help naman I ata.',
        upvotes: 19,
        user: {
            username: '@july617',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        comment: 'Kuha ka ng Grab or Angkas. Mas madali pa, magastos nga lang.',
        upvotes: 0,
        user: {
            username: '@pedro12',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        comment: 'That is bit vague. Where specifically is your starting and expected ending location?',
        upvotes: 1,
        user: {
            username: '@mary19',
            userIcon: '',
        },
        timestamp: '2024-03-16',
    },
    {
        comment: 'LMAO. Hindi marunong!',
        upvotes: 0,
        user: {
            username: '@troll101',
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
