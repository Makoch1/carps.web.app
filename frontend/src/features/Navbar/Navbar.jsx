import { Link } from "@tanstack/react-router"
import { useContext, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CurrentUserContext } from "../../routes/__root";
import axios from "axios";
import { BACKEND_BASE_URL } from '../../utils/constants.js';

export function Navbar() {
    const {
        currentUser,
        setCurrentUser // don't need the setCurrentUser
    } = useContext(CurrentUserContext);

    const [startInput, setStartInput] = useState('');
    const [endInput, setEndInput] = useState('');
    const navigate = useNavigate();

    // if no user logged in or if no icon is provided, defaults to generic icon
    // makes use of short circuit eval to prevent checking currentUser.picture when currentUser == null
    const iconElement = currentUser && currentUser.picture ?
        <img src={currentUser.picture} /> :
        <i className="bi bi-person-circle"></i>

    function handleSubmit(e) {
        e.preventDefault();

        // check if one of them is empty
        if (startInput === '' && endInput === '') {
            return; // for now. could be an error message later on
        }

        // move to search url
        navigate({
            to: '/search',
            search: {
                start: startInput,
                end: endInput,
                page: 1,
                filters: [],
            },
        })
    }

    function handleLogout() {
        if (currentUser) { // this is redundant ofc, but never hurts to add a guard
            axios({
                method: 'delete',
                baseURL: BACKEND_BASE_URL,
                url: '/logout'
            })
                .then(_ => setCurrentUser(null))
                .catch(_ => setCurrentUser(null))
        }
    }

    return (
        <nav id="navbar" className="navbar sticky-top navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand text-white fs-2 fw-bold" to="/">CARPS</Link>
                <form className="d-flex w-25 position-absolute top-50 start-50 translate-middle" role="search" onSubmit={handleSubmit}>
                    <div className="input-group me-1 gap-1 rounded-pill bg-secondary">
                        <input
                            className="form-control rounded-start-pill bg-dark border-0 py-2 px-4 text-white shadow-none"
                            type="search"
                            placeholder="Start..."
                            value={startInput}
                            onChange={e => setStartInput(e.target.value)} />
                        <input
                            className="form-control rounded-end-pill bg-dark border-0 py-2 px-4 text-white shadow-none"
                            type="search"
                            placeholder="Destination..."
                            value={endInput}
                            onChange={e => setEndInput(e.target.value)} />
                    </div>
                    <input type="submit" hidden /> {/* Allows user to submit using enter key */}
                </form>
                <div className="d-flex align-items-center gap-2">
                    {
                        currentUser ? // only add this when user is logged in
                            <>
                                <Link
                                    className="btn btn-secondary btn-sm fw-bold"
                                    to='/post/create'>
                                    <i class="me-2 bi bi-file-earmark-plus"></i>
                                    Create Post
                                </Link>
                                <button className="btn btn-secondary btn-sm fw-bold" onClick={handleLogout}>
                                    Logout
                                </button>
                                <Link
                                    className="nav-link d-flex gap-2 text-white fs-4 fw-bold"
                                    disabled={!currentUser}
                                    to={`/profile/${currentUser.uid}`} >
                                    {iconElement}
                                    <span className="mb-1">{currentUser.username}</span>
                                </Link>
                            </>
                            :// only add this, when user is logged out
                            <>
                                <Link
                                    className="nav-link d-flex gap-2 text-white fs-4 fw-bold"
                                    disabled={true}
                                    to=''>
                                    {iconElement}
                                    <span className="mb-1">Guest</span>
                                </Link>
                                <Link className="btn btn-secondary btn-sm fw-bold" to="/login">
                                    Sign in
                                </Link>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

