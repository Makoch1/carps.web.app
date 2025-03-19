import { transportTypes } from '../../utils/constants.js'
import './create.css'

export function CreatePost() {

    return (
        <div className='main'>
            <h1>Create Post</h1>

            <form action='/posts' method="post">

                <p>Enter the start and destination.</p>

                <input className="text" type="text" name='start' placeholder="Start" maxLength="100" required />
                <input className="text" type="text" name='destination' placeholder="Destination" maxLength="100" required />

                <p>Select the type of the trip.</p>

                <div className="toggle">
                    <input name="type" id="one-way" type="radio" value='one-way' checked />
                    <labeL htmlFor="one-way">One-Way</labeL>
                </div>

                <div className="toggle">
                    <input name="type" id="round" type="radio" value='round'/>
                    <labeL htmlFor="round">Round</labeL>
                </div>

                <p>Select the preferred mode of public transport. <br />
                    Multiple selections are allowed.</p>

                {
                    transportTypes.map((tag, index) => (
                        <>
                            <div key={index} className='toggle'>
                                <input id={tag} type='checkbox' name="tags" value={tag} />
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
