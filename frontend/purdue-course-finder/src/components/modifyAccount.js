import React, { useEffect, useState } from 'react';
import "./modifyAccount.css"

import { serverURL } from '../index.js';
import axios from 'axios';

function ModifyAccount() {
    const [editEmail, setEditEmail] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPass] = useState(".........");

    useEffect(() => {
        console.log("Running useEffect()");
        var url = `${serverURL}/auth/user`;
        const config = {
            headers:{
            "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
            }
        };
        
        axios.get(url, config).then((response) => {
            const data = response.data;
            setEmail(data);
        });
    }, [])
    
    const _handleEditEmail = (event) => {
        setEditEmail(true)
        setEditPass(false)
        setSuccess(null);
        return;
    }

    const _handleEditPass = (event) => {
        setEditEmail(false)
        setEditPass(true)
        setSuccess(null);
        return;
    }

    const _handleEditCancel = (event) => {
        setEditEmail(false)
        setEditPass(false)
        setError(null);
        return;
    }

    const _handleEditConfirm = (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (editEmail) {
            var {newEmail} = document.forms[0];
            //console.log(newEmail.value);

            if (newEmail.value === null || newEmail.value === "") {
                setError("Error: Email address is required.");
                return;
            }

            if (newEmail.value === email) {
                setError("Error: Your new email cannot be the same as your old email.");
                return;
            }

            // eslint-disable-next-line
            if (!newEmail.value.match(".+@.+\..+")) {
                setError("Error: Invalid email address. \nEmail must be in the format of 'email@example.com'");
                return;
            }

            let url = `${serverURL}/auth/modify-account`;
            axios({
                url: url,
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                },
                data: {
                    "oldEmail": email,
                    "newEmail": newEmail.value,
                    "newPassword": ".........",
                },
            }).then((response) => {
                if (response.status !== 200) {
                    setError(response.data);
                } else {
                    setError(null);
                    setSuccess("Success: Your email has been updated.");
                    setEmail(newEmail.value);
                    setEditEmail(false);
                    window.sessionStorage.setItem("userToken", response.data);
                }
            }).catch((error) => {
                setError(error.response.data.message);
            });
            

        } else if (editPass) {
            var {newPassword, confirmPassword} = document.forms[0];
            //console.log(newPassword.value, confirmPassword.value, password);

            if (newPassword.value === null || newPassword.value === "") {
                setError("Error: Password is required.");
                return;
            }
            if (newPassword.value === password) {
                setError("Error: Your new password cannot be the same as your old password.");
                return;
            }

            if (!newPassword.value.match("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,})")) { 	
                setError("Error: Your password must contain:\n" +	
                    "• 8 or more characters \n" + 	
                    "• At least one uppercase letter \n" +	
                    "• At least one lowercase letter \n" +	
                    "• At least one number");	
                return;	
            }
            if (newPassword.value !== confirmPassword.value) {
                setError("Error: Passwords must match");
                return;
            }

            let url = `${serverURL}/auth/modify-account`;
            axios({
                url: url,
                method: 'POST',
                headers:{
                    "Authorization": `Bearer ${window.sessionStorage.getItem("userToken")}`
                },
                data: {
                    "oldEmail": email,
                    "newEmail": email,
                    "newPassword": newPassword.value,
                },
            }).then((response) => {
                if (response.status !== 200) {
                    setError(response.data);
                } else {
                    setError(null);
                    setSuccess("Success: Your password has been updated.");
                    setPass(newPassword.value);
                    setEditPass(false);
                }
            }).catch((error) => {
                setError(error.response.data.message);
            });

        }
    }

    return (
        <div data-testid="modify_account" className='modifyAcnt'>
            <div className="form-container">
                <h1 style={{textAlign: "center"}}>My Account</h1>
                <form data-testid="modify_form" className="form" >
                    {editEmail && (
                        <div className="input-container" >
                            <label>New Email Address </label>
                            <input type="text" name="newEmail" defaultValue={email}/>
                        </div>
                    )}
                    {!editEmail && (
                        <div data-testid="noedit_email_input" className="input-container" >
                            <label>Email Address </label>
                            <input type="text" value={email} readOnly style={{
                                pointerEvents: "none",
                                backgroundColor: "#bababa"}}/>
                        </div>
                    )}                    
                        
                    {editPass && (
                        <div className="input-container">
                            <label>New Password </label>
                            <input type="password" name="newPassword" />
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" />
                        </div>
                    )}
                    {!editPass && (
                        <div data-testid="noedit_password_input" className="input-container">
                            <label>Password </label>
                            <input type="password" value={password} readOnly style={{
                            pointerEvents: "none",
                            backgroundColor: "#bababa"}}/>
                        </div>
                    )}

                    {!editEmail &&! editPass && (
                        <div data-testid="noedit_buttons" className="button-container">
                            <button className="button" type={"button"} onClick={_handleEditEmail}>Edit Email</button>
                            <button className="button" type={"button"} onClick={_handleEditPass}>Edit Password</button>
                        </div>
                    )}
                    {(editEmail || editPass) && (
                        <div className="button-container">
                            <button className="afterButton" type={"button"} onClick={_handleEditCancel}>Cancel</button>
                            <button className="afterButton" type={"submit"} onClick={_handleEditConfirm}>Confirm</button>
                        </div>
                    )}

                    {error && (
                        <div>
                            <br></br>
                            <div className="error">
                                {error}
                            </div>
                        </div>
                    )}
                    {success && (
                        <div>
                            <br></br>
                            <div className="success">
                                {success}
                            </div>
                        </div>
                    )}

                </form>               
                {!editEmail &&! editPass && (
                    <div className="delete">
                        <form action="/deleteacct">
                            <input className = "deleteBtn" type="submit" value="Delete Account" />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModifyAccount;