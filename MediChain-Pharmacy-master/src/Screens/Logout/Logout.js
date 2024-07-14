import React from 'react'
import './Logout.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice'

const Logout = () => {

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.setItem('loggedin', false)
        dispatch(logout());
    }

    return (
        <div>
            <h1>
                <button className="logout__button" onClick={(e) => handleLogout(e)}>Logout</button>
            </h1>
        </div>
    )
}

export default Logout
