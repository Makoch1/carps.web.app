import { getPosts } from './getPosts.js'

const mockProfileData = [
    {
        profilePicture: 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png',
        description: 'Lorem ipsum I am a mock description.',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    }
]

export function getProfileData(userId) {
    return mockProfileData[userId - 1]
}
