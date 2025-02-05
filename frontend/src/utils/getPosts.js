const mockPosts = [
    {
        postId: 1,
        start: 'Cabuyao',
        destination: 'SM Sta. Rosa',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        postId: 2,
        start: 'Nuvali',
        destination: 'Makati',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: false,
    },
    {
        postId: 3,
        start: 'DLSU Laguna',
        destination: 'DLSU Manila',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: false,
    },
    {
        postId: 4,
        start: 'Nuvali',
        destination: 'DLSU Laguna',
        upvotes: 56,
        tags: ['Tricycle'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: true,
        description: 'Lorem ipsum type shi'
    },
    {
        postId: 5,
        start: 'Nuvali',
        destination: 'BGC',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: true,
        description: 'Lorem ipsum type shi'
    },
    {
        postId: 6,
        start: 'SM Sta. Rosa',
        destination: 'UPLB',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: false,
        description: 'Lorem ipsum type shi'
    },
    {
        postId: 7,
        start: 'DLSU Manila',
        destination: 'Makati Circuit',
        upvotes: 900,
        tags: ['Jeepney', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        oneWay: true,
        description: 'Lorem ipsum type shi'
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
