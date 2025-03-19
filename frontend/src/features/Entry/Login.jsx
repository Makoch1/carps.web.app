import { Link, useNavigate } from '@tanstack/react-router'
import './entry.css'
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/constants.js';
import { useState } from 'react';

export function Login() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios({
            method: 'post',
            baseURL: BACKEND_BASE_URL,
            url: '/login',
            data: {
                username: e.target.username.value,
                password: e.target.password.value,
            }
        })
            .then(_ => navigate({ to: '/' }))
            .catch(_ => setError(true))
    }

    return (
        <div className='bg-body'>

            <div id='login' className='dialog'>
                <h1>CARPS <span>TO GO!</span></h1>

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input name="username" className="username" type="text" placeholder="Username" required /> <br />
                    <input name="password" className="password" type="password" placeholder="Password" required /> <br />
                    <input className="remember" id="rememberLogin" type="checkbox" /> <label htmlFor="rememberLogin">Remember me?</label>
                    <br />
                    {
                        error &&
                        <p>Invalid Username and Password</p>
                    }
                    <input className="submit" type="submit" value="Login" />
                </form>

                <Link to='/register'>Don't have an account? Register here!</Link>

            </div >
        </div>
    )
}
