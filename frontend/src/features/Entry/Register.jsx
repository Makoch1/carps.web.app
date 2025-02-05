import { Link } from '@tanstack/react-router'
import './entry.css'

export function Register() {
    return (
        <div className='bg-body'>
            <div id='register' className='dialog'>
                <h1>CARPS <span>TO GO!</span></h1>

                <h2>Register</h2>
                <form method="push">
                    <input class="username" type="text" placeholder="Username" required /> <br />
                    <input class="password" type="password" placeholder="Password" required /> <br />
                    <input class="remember" id="rememberRegister" type="checkbox" /> <label htmlFor="rememberRegister">Remember me?</label>
                    <p>Username and Password Already Taken</p>
                    <input class="submit" type="submit" value="Register" />
                </form>

                <Link to='/login'>Already have an account? Login here!</Link>
            </div>
        </div>
    )
}
