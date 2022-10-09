import React, { useState } from 'react';
import {Button} from "react-bootstrap"
import './loginPage.css'


function Signup() {
    const [error, setError] = useState(null);

    const handleSubmitClick = (event) => {
        event.preventDefault();
        var {email, password, passwordConfirm} = document.forms[0];
        // console.log(email.value, password.value, passwordConfirm.value);
        if (email.value === null || email.value === "") {
            setError("Error: Email address is required.");
            return;
        }
        if (password.value === null || password.value === "") {
            setError("Error: Password is required.");
            return;
        }
        // eslint-disable-next-line
        if (!email.value.match(".+@.+\..+")) {
            setError("Error: Invalid email address. \nEmail must be in the format of 'email@example.com'");
            return;
        }
        if (password.value !== passwordConfirm.value) {
            setError("Error: Passwords must match");
            return;
        }
        setError(null);
        return;
    }

    return (
        <div className="form-container" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
        <div className='Purd-Head'>
            Purdue Course Finder
        </div>
            {error !== null && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}

            <form className="form" onSubmit={handleSubmitClick}>
                <div className='login-label'>
                    Sign Up
                </div>
                <div className="input-container">
                    <label>Email Address </label>
                    <input type="text" name="email" />

                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" />

                </div>
                <div className="input-container">
                    <label>Confirm Password </label>
                    <input type="password" name="passwordConfirm" />

                </div>
                <div className="button-container">
                    <Button className="button" type={"submit"} variant={"success"}>Sign Up</Button>
                </div>
                <div>
                    <a href='./login' style={{display: 'flex', justifyContent: 'center'}}>Have an account? Log In</a>
                </div>
            </form>
        </div>
    );
}

export default Signup;