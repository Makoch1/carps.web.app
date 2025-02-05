import { Link } from "@tanstack/react-router"
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function Navbar({ userIcon, userId }) {
    const [startInput, setStartInput] = useState('');
    const [endInput, setEndInput] = useState('');
    const navigate = useNavigate();

    /* if no icon is provided, defaults to generic icon */
    const iconElement = userIcon ? <img src={userIcon} /> : <i className="bi bi-person-circle"></i>

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

    return (
        <nav id="navbar" className="navbar sticky-top navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand text-white fs-2 fw-bold" to="/">CARPS</Link>
                <form className="d-flex w-25 mx-auto" role="search" onSubmit={handleSubmit}>
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
                    <Link
                        className="btn btn-secondary btn-sm fw-bold"
                        to='/create-post'>
                        <i class="me-2 bi bi-file-earmark-plus"></i>
                        Create Post
                    </Link>
                    <Link
                        className="nav-link d-flex gap-2 text-white fs-4 fw-bold"
                        disabled={!userId}
                        to={`/profile/${userId}`} >
                        {iconElement}
                        <span className="mb-1">{userId ? userId : 'Guest'}</span>
                    </Link>
                    {
                        // only add this, when user is logged out
                        !userId &&
                        <Link className="btn btn-secondary btn-sm fw-bold" to="/login">
                            Sign in
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

