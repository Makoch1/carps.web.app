import { transportTypes } from '../../utils/constants.js'
import './create.css'

export function CreatePost() {

    return (
        <div className='main'>
            <h1>Create Post</h1>

            <form method="post">

                <p>Enter the start and destination.</p>

                <input className="text" type="text" placeholder="Start" maxLength="100" required />
                <input className="text" type="text" placeholder="Destination" maxLength="100" required />

                <p>Select the type of the trip.</p>

                <div className="toggle">
                    <input name="type" id="one-way" type="radio" checked />
                    <labeL htmlFor="one-way">One-Way</labeL>
                </div>

                <div className="toggle">
                    <input name="type" id="round" type="radio" />
                    <labeL htmlFor="round">Round</labeL>
                </div>

                <p>Select the preferred mode of public transport. <br />
                    Multiple selections are allowed.</p>

                {
                    transportTypes.map((tag, index) => (
                        <>
                            <div key={index} className='toggle'>
                                <input id={tag} type='checkbox' />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                            {(index + 1) % 3 == 0 && <br />}
                        </>
                    ))
                }

                <p>Enter any additional details.</p>

                <textarea id="description" placeholder="Description" maxLength="2500"></textarea> <br />

                <input className="submit" type="submit" value="Post" />

            </form>
        </div>
    )
}
