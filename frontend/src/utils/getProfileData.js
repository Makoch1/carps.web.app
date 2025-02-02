import { getPosts } from './getPosts.js'

const mockProfileData = [
    {
        profilePicture: 'https://i.sstatic.net/l60Hf.png',
        description: 'Lorem ipsum I am a mock description.',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    }
]

export function getProfileData(userId) {
    return mockProfileData[userId - 1]
}
