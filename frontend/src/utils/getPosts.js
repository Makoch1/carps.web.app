const mockPosts = [
    {
        postId: 1,
        start: 'Cabuyao',
        destination: 'SM Sta. Rosa',
        upvotes: 56,
        tags: ['Bus', 'Taxi'],
        timestamp: '2024-03-16',
        user: {
            username: '@albertjames17',
            userIcon: ''
        },
        oneWay: true,
        description: 'Sabi daw nila na lahat ay connected sa Cabuyao. I am wondering if the same is true when doing the opposite.'
    },
    {
        postId: 2,
        start: 'Sta. Rosa, Laguna',
        destination: 'Mandaluyong',
        upvotes: 56,
        tags: ['Bus', 'Train'],
        timestamp: '2024-03-16',
        user: {
            username: '@rachel456',
            userIcon: ''
        },
        oneWay: false,
        description: 'Hello! I want to ask since I want to visit my relatives.'
    },
    {
        postId: 3,
        start: 'DLSU',
        destination: 'PICC',
        upvotes: 56,
        tags: ['Jeep', 'Taxi'],
        timestamp: '2024-03-16',
        user: {
            username: '@idk',
            userIcon: ''
        },
        oneWay: false,
        description: 'Just be straight with me kung madali o hindi, especially kung travelling as a graduating student.'
    },
    {
        postId: 4,
        start: 'Balibago',
        destination: 'SM Sta. Rosa',
        upvotes: 56,
        tags: ['Jeep', 'Train'],
        timestamp: '2024-03-16',
        user: {
            username: '@shyforeigner',
            userIcon: ''
        },
        oneWay: true,
        description: 'English only please!'
    },
    {
        postId: 5,
        start: 'Cabuyao',
        destination: 'SM Fairview',
        upvotes: 56,
        tags: ['Bus', 'Train'],
        timestamp: '2024-03-16',
        user: {
            username: '@jacob117',
            userIcon: ''
        },
        oneWay: true,
        description: 'If possible, please include expected costs.'
    },
]

export function getPosts(start = "", end = "", page = 1, sort = 'popular', filters = []) {
    const posts = mockPosts
        .filter(post => post.start.toLowerCase().includes(start.toLowerCase())) // filter start
        .filter(post => post.destination.toLowerCase().includes(end.toLowerCase())) // filter end
        .filter(post => {
            if (filters.length === 0) {
                return true;
            }

            for (let i = 0; i < filters.length; i++) {
                const flt = filters[i];
                if (post.tags.includes(flt)) {
                    return true;
                }
            }

            return false;
        }) // filter transpo types

    // sort
    if (sort === 'popular') {
        posts.sort((a, b) => b.upvotes - a.upvotes); // see sort definition
    } else if (sort === 'new') {
        posts.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
    }

    return posts;
}
