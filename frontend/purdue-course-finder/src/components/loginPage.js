import React, { useState } from 'react';
import './loginPage.css';


function Login() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleLoginClick = (event) => {
        
        event.preventDefault();
        var {email, password} = document.forms[0];
        console.log(email.value, password.value);

        setError(null);
        //if response from server is error
        if (true) {
            setError("Error: The email or password you entered is incorrect.");
        } else {
            setError(null);
            setSuccess(true);
        }
        
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