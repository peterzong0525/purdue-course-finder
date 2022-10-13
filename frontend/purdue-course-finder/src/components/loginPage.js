import React, { useState } from 'react';
import './loginPage.css';
import { serverURL } from '../index.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [error, setError] = useState(null);
    //const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = (event) => {
        
        event.preventDefault();
        var {email, password} = document.forms[0];
        console.log(email.value, password.value);

        setError(null);

        var url = `${serverURL}/auth/login`;
        axios({
            url: url,
            method: 'POST',
            data: {
                "email": email.value,
                "password": password.value,
            },
        }).then((response) => {
            if (response.status !== 200) {
                //error
                setError(response.data);
            } else {
                //success
                setError(null);
                //setSuccess(true);
                navigate('/');
            }
        }).catch((error) => {
            setError("The email address or password entered is incorrect.");
        });

        
    }
    return (
        <div className="form-container" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>                
        <div className='Purd-Head'>
            Purdue Course Finder
        </div>
            <form className="form" onSubmit={handleLoginClick}>
                <div className='login-label'>
                    Log In
                </div>
                <div className="input-container">
                    <label>Email Address </label>
                    <input type="text" name="email" required />

                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required />

                </div>
                {error !== null && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                <div className="button-container">
                    <button className="button" type={"submit"} >Log In</button>
                </div>
                <div className='other-links'>
                    <a href='./' >Forgot Password?</a>
                    <a href='./signup' style={{marginLeft: 'auto'}}>Create an Account</a>
                </div>
            </form>
        </div>
    );
}

export default Login;