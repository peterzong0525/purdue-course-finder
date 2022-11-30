import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Dialog } from '@material-ui/core';
import axios from 'axios';
import "./loginPage.css";
import { serverURL } from '../index.js';

function Suggestions() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmitClick = (event) => {
        event.preventDefault();
        var {suggestion} = document.forms[0];
        console.log(suggestion.value)
        if (suggestion.value === null || suggestion.value === "") {
            setError("Error: Can't submit empty suggestion.");
            return;
        }
        setError(null);

        //send suggestion to server
        var headers = null;
        if (window.sessionStorage.getItem("userToken")) {
            headers = {
                "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
            };
        }
        var url = `${serverURL}/suggestion`;
        axios({
            url: url,
            headers: headers,
            method: 'POST',
            data: {
                "suggestion": suggestion.value,
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
            console.log(error);
            setError(error.response.data.message);
        });
    }

    return (
        <div className="logSignContainer">
            <div className='returnHomeContainer'>
                <a className='returnHome' href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 6">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>
                    Home
                </a>
            </div>
            <div className="form-container" data-testid="suggestions_container">
                <Dialog open={success}>
                    <div className="signupSuccess">
                        <p>Suggestion Submitted</p>
                        <p><a href='./'>Home</a></p>
                        
                    </div>
                </Dialog>
                <div className='Purd-Head' data-testid="suggestions_head">
                    Purdue Course Finder
                </div>
                <div className='login-label'>
                    Contact Us / Suggestions
                </div>
                <div className="info">
                    <p>{"Submit notes about the app or \nsuggestions for future features here."}</p>
                </div>
                {error !== null && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                <form className="form" data-testid="suggestions_form" onSubmit={handleSubmitClick}>
                    <div className="input-container" data-testid="suggestions_input">
                        <br></br>
                        <textarea
                            className="suggestions_input"
                            placeholder="Type Here..."
                            id="text"
                            name="suggestion"
                            rows="8"
                            cols="25"
                        />
                    </div>
                    <div className="button-container" data-testid="suggestions_button">
                        <Button className="button" type={"submit"} variant={"success"}>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Suggestions;