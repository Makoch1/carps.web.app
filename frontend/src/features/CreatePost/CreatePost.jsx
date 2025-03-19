import axios from 'axios';
import { BACKEND_BASE_URL, transportTypes } from '../../utils/constants.js'
import './create.css'
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function CreatePost() {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    function handleTagClick(tagName) {
        let newTags;

        if (tags.includes(tagName)) {
            newTags = tags.filter(tag => tag !== tagName);
        } else {
            newTags = [...tags, tagName];
        }

        setTags(newTags);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target

        axios({
            method: 'post',
            baseURL: BACKEND_BASE_URL,
            url: '/posts',
            data: {
                start: form.start.value,
                destination: form.destination.value,
                tags: tags,
                type: form.type.value,
                description: form.description.value
            },
        })
            .then(_ => navigate({ to: '/' }))
            .catch(e => window.alert('An error occured!'))
    }

    return (
        <div className='main'>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>

                <p>Enter the start and destination.</p>

                <input className="text" type="text" name='start' placeholder="Start" maxLength="100" required />
                <input className="text" type="text" name='destination' placeholder="Destination" maxLength="100" required />

                <p>Select the type of the trip.</p>

                <div className="toggle">
                    <input name="type" id="one-way" type="radio" value='one-way' checked />
                    <labeL htmlFor="one-way">One-Way</labeL>
                </div>

                <div className="toggle">
                    <input name="type" id="round" type="radio" value='round' />
                    <labeL htmlFor="round">Round</labeL>
                </div>

                <p>Select the preferred mode of public transport. <br />
                    Multiple selections are allowed.</p>

                {
                    transportTypes.map((tag, index) => (
                        <>
                            <div key={index} className='toggle'>
                                <input id={tag} type='checkbox' name="tags" value={tag} onClick={() => handleTagClick(tag)} />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                            {(index + 1) % 3 == 0 && <br />}
                        </>
                    ))
                }

                <p>Enter any additional details.</p>

                <textarea id="description" name='description' placeholder="Description" maxLength="2500"></textarea> <br />

                <input className="submit" type="submit" value="Post" />

            </form>
        </div>
    )
}
