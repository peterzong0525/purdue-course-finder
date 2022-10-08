import React from 'react';
import {Button} from "react-bootstrap"
import './loginPage.css'


function signup() {
    const handleLoginClick = (event) => {
        event.preventDefault();
        var {email, password} = document.forms[0];
        console.log(email.value, password.value);
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
                    Sign Up
                </div>
                <div className="input-container">
                    <label>Email Address </label>
                    <input type="text" name="email" required />

                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required />

                </div>
                <div className="input-container">
                    <label>Confirm Password </label>
                    <input type="password" name="password" required />

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

export default signup;