import { useState } from "react";

export function useUpvote(initialValue = 0) {
    const [upvote, setUpvote] = useState(initialValue);

    const handleUpvote = () => upvote === 1 ? setUpvote(0) : setUpvote(1);
    const handleDownvote = () => upvote === -1 ? setUpvote(0) : setUpvote(-1);

    const upvoteColor = () => {
        switch (upvote) {
            case -1: return 'lightblue';
            case 0: return 'white';
            case 1: return 'orangered';
        }
    }

    return [
        upvote,
        upvoteColor,
        handleUpvote,
        handleDownvote,
    ]
}
