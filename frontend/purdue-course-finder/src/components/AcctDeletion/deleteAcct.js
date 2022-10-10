import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import "./deleteAcct.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

function printButtonPress(confirmOrDeny) {
    console.log('clicked');
    console.log(confirmOrDeny);
    const serverResponse = 'not changed';
    axios.get(`http://localhost:80/test/delete-login?email=testemail&password=testpassword`) // Need a real address
        .then(res => console.log(res.data));
    //`localhost:80/test/signup?email=testemail&password=testpassword`
    //`https://jsonplaceholder.typicode.com/users`
}

function returnButton (value) {
    return (<input type="submit" value={value} onClick={() => printButtonPress(value)}/>);
}

function deleteAcctPage() {
    return (
        <div data-testid="delete_parent" class='parent'>
            <div class="gold-background">
                <div data-testid="delete_header" class="Purd-Head">
                    Purdue Course Finder
                </div>
                <div data-testid="delete_back_button" class='back-button'>
                    <a href="/">
                        <a href="/" class="button">Go Back</a>
                    </a>
                </div>
                <p>&nbsp;</p>
            </div>

            <p>&nbsp;</p>

            <div align="center">
                <div class="user-info">
                    <p>First Name: first_name</p>
                    <p>Last Name: last_name</p>
                    <p>Email: email_address</p>
                </div>
            </div>

            <p>&nbsp;</p>

            <div data-testid="delete_delete_button" class="box">
                <a href="#ConfirmDelete" class="button">Delete Account</a>
            </div>

            <div data-testid="delete_confirm_window" class="overlay" id="ConfirmDelete">
                <div class="wrapper">
                    <h2>Are you sure you would like to Delete Your Account? This cannot be undone.</h2>
                    <a href="#" class="close">&times;</a>
                    <div class="content">
                        <div class="container">
                            <form>
                                {returnButton('Confirm')}
                                &nbsp;
                                {returnButton('Cancel')}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default deleteAcctPage;
