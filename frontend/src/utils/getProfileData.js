import { getPosts } from './getPosts.js'

const mockProfileData = [
    {
        profilePicture: 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png',
        description: 'Kamusta! Bago palang ako sa pag-commute, so please help me out!',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    },
    {
        profilePicture: 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png',
        description: 'Studying in DLSU Laguna since Birth ;)',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    },
    {
        profilePicture: 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png',
        description: '[-_-]',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    },
    {
        profilePicture: 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png',
        description: '',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    },
    {
        profilePicture: 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free-thumbnail.png',
        description: 'Hello po! Ako ay isang foreigner currently living in Manila.',
        posts: getPosts().slice(0, 2),
        savedPosts: getPosts().slice(2, 5),
    }
]

export function getProfileData(userId) {
    return mockProfileData[userId - 1]
}
