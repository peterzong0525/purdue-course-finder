import React from 'react';
import { serverURL } from '../index.js';
import "./deleteAcct.css";
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

function printButtonPress(confirmOrDeny) {
    // eslint-disable-next-line
    let serverResponse = 'not changed';
    var url = `${serverURL}/auth/delete-user`;
    axios({
        url: url,
        method: 'POST',
    }).then(res => console.log(res.data));    // Save response to variable 'serverResponse' eventually
}

function returnButton (value) {
    return (<input type="submit" value={value} onClick={() => printButtonPress(value)}/>);
}

function DeleteAcct() {
    return (
        <div data-testid="delete_parent" className='parent'>
            <div className="gold-background">
                <div data-testid="delete_header" className="Purd-Head2">
                    Purdue Course Finder
                </div>
                <div data-testid="delete_back_button" className='back-button'>
                    <a href="/modifyAccount" className="button2">Go Back</a>
                </div>
                <p>&nbsp;</p>
            </div>

            <p>&nbsp;</p>

            <div align="center">
                <div className="user-info">
                    <p>First Name: first_name</p>
                    <p>Last Name: last_name</p>
                    <p>Email: email_address</p>
                </div>
            </div>

            <p>&nbsp;</p>

            <div data-testid="delete_delete_button" className="box">
                <a href="#ConfirmDelete" className="button2">Delete Account</a>
            </div>

            <div data-testid="delete_confirm_window" className="overlay" id="ConfirmDelete">
                <div className="wrapper" data-testid="delete_popup">
                    <h2>Are you sure you would like to Delete Your Account? This cannot be undone.</h2>
                    {/* eslint-disable-next-line */}
                    <a href="#" className="close">&times;</a>
                    <div className="content">
                        <div className="container">
                            <form>
                                <div className="box">
                                    {returnButton('Confirm')}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAcct;
