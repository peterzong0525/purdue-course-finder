import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Dialog } from '@material-ui/core';
import axios from 'axios';
import "./loginPage.css";
import { serverURL } from '../index.js';


function Signup() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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
        if (!password.value.match("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,})")) { 	
            setError("Error: Your password must contain:\n" +	
                "• 8 or more characters \n" + 	
                "• At least one uppercase letter \n" +	
                "• At least one lowercase letter \n" +	
                "• At least one number");	
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

        //send new account credentials to server
        var url = `${serverURL}/auth/register`;
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
                setSuccess(true);
            }
        }).catch((error) => {
            // console.log(error);
            setError(error.response.data.message);
        });
    }

    return (
        <div className="logSignContainer">
            <div className="form-container" data-testid="signup_container">
                <Dialog open={success}>
                    <div className="signupSuccess">
                        <p>Account Created Successfully</p>
                        <p><a href='./login'>Log In</a></p>
                        
                    </div>
                </Dialog>
                <div className='Purd-Head' data-testid="signup_head">
                    Purdue Course Finder
                </div>
                <div className='login-label'>
                    Sign Up
                </div>
                {error !== null && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                <form className="form" data-testid="signup_form" onSubmit={handleSubmitClick}>
                    <div className="input-container" data-testid="signup_email">
                        <label>Email Address </label>
                        <input type="text" name="email" />

                    </div>
                    <div className="input-container" data-testid="signup_password1">
                        <label>Password </label>
                        <input type="password" name="password" />

                    </div>
                    <div className="input-container" data-testid="signup_password2">
                        <label>Confirm Password </label>
                        <input type="password" name="passwordConfirm" />

                    </div>
                    <div className="button-container" data-testid="signup_signup_button">
                        <Button className="button" type={"submit"} variant={"success"}>Sign Up</Button>
                    </div>
                    <div>
                        <a href='./login' style={{display: 'flex', justifyContent: 'center'}}>Have an account? Log In</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;