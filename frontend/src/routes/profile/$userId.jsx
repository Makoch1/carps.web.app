import { createFileRoute } from '@tanstack/react-router'
import { getProfileData } from '../../utils/getProfileData'
import { PostFeed } from '../../features/PostFeed/PostFeed.jsx'
import { useState } from 'react'
import { CurProfile } from '../../features/Edit/CurProfile.jsx'

export const Route = createFileRoute('/profile/$userId')({
    loader: ({ params: { userId } }) => {
        return getProfileData(userId);
    },
    component: RouteComponent,
})

function RouteComponent() {
    const profileData = Route.useLoaderData();

    /* This is where you define the possible "tabs" and the components related to them
     * (My Carps, Saved carps, edit profile)
     * Think of this as like an enum */
    const Tabs = Object.freeze({
        posts: <PostFeed posts={profileData.posts} />,
        saved: <PostFeed posts={profileData.savedPosts} />,
        edit: <CurProfile userId={profileData.userId} profilePicture={profileData.profilePicture} description={profileData.description} />
    });

    const [currentTab, setCurrentTab] = useState('posts') // posts are displayed by default

    return (
        <div className='d-flex mt-5'>
            <div className='w-25'>
                <div className='d-flex flex-column w-50 m-auto mt-5 p-2 border-top border-bottom border-primary border-2'>
                    <button
                        className={`btn btn-primary ${currentTab === 'posts' ? '' : 'bg-transparent'} my-2 border-0 text-start`}
                        onClick={() => setCurrentTab('posts')}>
                        My CARPS
                    </button>
                    <button
                        className={`btn btn-primary ${currentTab === 'saved' ? '' : 'bg-transparent'} my-2 border-0 text-start`}
                        onClick={() => setCurrentTab('saved')}>
                        Saved CARPS
                    </button>
                    <button
                        className={`btn btn-primary ${currentTab === 'edit' ? '' : 'bg-transparent'} my-2 border-0 text-start`}
                        onClick={() => setCurrentTab('edit')}>
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className='w-75'>
                {Tabs[currentTab]}
            </div>
        </div >
    )
}
