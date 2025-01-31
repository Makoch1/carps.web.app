const mockPosts = [
    {
        title: 'Road Exhaust Pipe',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'Road Exhaust Pipe',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
    },
    {
        title: 'Road Exhaust Pipe',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
    },
    {
        title: 'Road Exhaust Pipe',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        description: 'Lorem ipsum type shi'
    },
    {
        title: 'Road Exhaust Pipe',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        description: 'Lorem ipsum type shi'
    },
    {
        title: 'Road Exhaust Pipe',
        upvotes: 56,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        description: 'Lorem ipsum type shi'
    },
    {
        title: 'Road Exhaust Pipe',
        upvotes: 900,
        tags: ['P2P', 'Jeepney'],
        timestamp: '2024-03-16',
        user: {
            username: '@Eme',
            userIcon: ''
        },
        description: 'Lorem ipsum type shi'
    },
]

export function getPosts(query = "", page = 1, filters = []) {
    return mockPosts;
}
