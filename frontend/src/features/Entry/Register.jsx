import { register } from '../../utils/register.js'
import { Link, useNavigate } from '@tanstack/react-router'
import './entry.css'
import { useState } from 'react';

export function Register() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (await register(e.target.username.value, e.target.password.value)) {
            setError(false);
            window.alert("Registration successful!");

            navigate({
                to: '/login',
                state: { from: 'home' },
            })
        } else {
            setError(true);
        }
    }
    return (
        <div className='bg-body'>
            <div id='register' className='dialog'>
                <h1>CARPS <span>TO GO!</span></h1>

                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input class="username" name='username' type="text" placeholder="Username" required /> <br />
                    <input class="password" name='password' type="password" placeholder="Password" required /> <br />
                    <input class="remember" name='remember' id="rememberRegister" type="checkbox" /> <label htmlFor="rememberRegister">Remember me?</label>
                    <br />
                    {error && <p>Username Already Taken</p>}
                    <input class="submit" type="submit" value="Register" />
                </form>

                <Link to='/login'>Already have an account? Login here!</Link>
            </div>
        </div>
    )
}
