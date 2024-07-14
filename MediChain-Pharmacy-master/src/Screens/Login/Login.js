import React, { useState } from 'react';
import './Login.css';
import { login } from '../../apis/authentication';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Login = (props) => {
    const navigate = useNavigate();
    const loggedin = (e) => {
        e.preventDefault();
        login({ email, password }).then((res) => res.json()).then((user) => {
            if (user.token) {
                Swal.fire({
                    title: 'Login Successful',
                    icon: 'success',
                    confirmButtonText: 'ok'
                });
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/dashboard');
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'User not found',
                    icon: 'error',
                });
            }
            console.log(user);
        }).catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: 'User not found',
                icon: 'error',
            });
            console.log(err);
        });
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login">
            <form className="login__form" onSubmit={e => loggedin(e)}>
                <h1 style={{ fontSize: 60 }} className='mb-1'>Medisecure</h1>
                <h1>Login Here!</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="submit__btn">
                    Submit
                </button>
                <h4 className='not__registered'>Not Registered? <a href='/register'>Register here</a></h4>
            </form>
        </div>
    );
}

export default Login;
