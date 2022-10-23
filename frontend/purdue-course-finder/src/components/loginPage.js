import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';
import { serverURL } from '../index.js';


function Login() {
    const [error, setError] = useState(null);
    //const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = (event) => {
        event.preventDefault();
        var {email, password} = document.forms[0];

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
            // console.log(response);
            if (response.status !== 200) {
                //error
                setError(response.data);
            } else {
                //success
                setError(null);
                window.sessionStorage.setItem("userToken", response.data);
                navigate('/');
            }
        }).catch((error) => {
            // console.log(error);
            setError("The email address or password entered is incorrect.");
        });

        
    }
    return (
        <div className="logSignContainer">
            <div className="form-container" data-testid="login_container">                
                <div className='Purd-Head' data-testid="login_head">
                    Purdue Course Finder
                </div>
                <form className="form" data-testid="login_form" onSubmit={handleLoginClick}>
                    <div className='login-label' data-testid="login_label">
                        Log In
                    </div>
                    <div className="input-container" data-testid="login_email">
                        <label>Email Address </label>
                        <input type="text" name="email" required />

                    </div>
                    <div className="input-container" data-testid="login_password">
                        <label>Password </label>
                        <input type="password" name="password" required />

                    </div>
                    {error !== null && (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="button-container" data-testid="login_button">
                        <button className="button" type={"submit"} >Log In</button>
                    </div>
                    <div className='other-links' data-testid="login_links">
                        <a href='./' >Forgot Password?</a>
                        <a href='./signup' style={{marginLeft: 'auto'}}>Create an Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;