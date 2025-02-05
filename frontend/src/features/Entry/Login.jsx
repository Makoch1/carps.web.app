import { Link } from '@tanstack/react-router'
import './entry.css'

export function Login() {
    return (
        <div className='bg-body'>

            <div id='login' className='dialog'>
                <h1>CARPS <span>TO GO!</span></h1>

                <h2>Login</h2>

                <form method='get'>
                    <input className="username" type="text" placeholder="Username" required /> <br />
                    <input className="password" type="password" placeholder="Password" required /> <br />
                    <input className="remember" id="rememberLogin" type="checkbox" /> <label htmlFor="rememberLogin">Remember me?</label>
                    <p>Invalid Username and Password</p>
                    <input className="submit" type="submit" value="Login" />
                </form>

                <Link to='/register'>Don't have an account? Register here!</Link>

            </div >
        </div>
    )
}
