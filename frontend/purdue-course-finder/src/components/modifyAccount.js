import React, { useState } from 'react';
import "./modifyAccount.css"

function ModifyAccount() {
    const [editEmail, setEditEmail] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [email, setEmail] = useState("Email@gmail.com");
    const [password, setPass] = useState("Password1");

    
    const _handleEditEmail = (event) => {
        setEditEmail(true)
        setEditPass(false)
        return;
    }

    const _handleEditPass = (event) => {
        setEditEmail(false)
        setEditPass(true)
        return;
    }

    const _handleEditCancel = (event) => {
        setEditEmail(false)
        setEditPass(false)
        setError(null);
        setSuccess(null);
        return;
    }

    const _handleEditConfirm = (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (editEmail) {
            var {email} = document.forms[0];
            console.log(email.value);

            if (email.value === null || email.value === "") {
                setError("Error: Email address is required.");
                return;
            }
            if (!email.value.match(".+@.+\..+")) {
                setError("Error: Invalid email address. \nEmail must be in the format of 'email@example.com'");
                return;
            }

            //if response from server is error
            if (false) {
                setError("Error: An account with that email address already exists.");
            } else {
                setError(null);
                setSuccess("Success: Your email has been updated.");
                setEmail(email.value);
                setEditEmail(false);
            }
            

        } else if (editPass) {
            var {password, confirmPassword} = document.forms[0];
            console.log(password.value, confirmPassword.value);

            if (password.value === null || password.value === "") {
                setError("Error: Password is required.");
                return;
            }
            if (!password.value.match("((?=.*[0-9])(?=.*[a-z]).{8,})")) { 	
                setError("Error: Your password must contain:\n" +	
                    "• 8 or more characters \n" + 	
                    "• At least one uppercase letter \n" +	
                    "• At least one lowercase letter \n" +	
                    "• At least one number");	
                return;	
            }
            if (password.value !== confirmPassword.value) {
                setError("Error: Passwords must match");
                return;
            }

            if (false) {
                setError("Error: Some error message.");
            } else {
                setError(null);
                setSuccess("Success: Your password has been updated.");
                setPass(password.value);
                setEditPass(false);
            }
        }
    }

    return (
        <div className='modifyAcnt'>
            <div className="form-container" style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <h1 style={{textAlign: "center"}}>My Account</h1>
                <form className="form" >
                    {editEmail && (
                        <div className="input-container" >
                            <label>New Email Address </label>
                            <input type="text" name="email" defaultValue={email}/>
                        </div>
                    )}
                    {!editEmail && (
                        <div className="input-container" >
                            <label>Email Address </label>
                            <input type="text" name="email" value={email} readOnly style={{
                                pointerEvents: "none",
                                backgroundColor: "#bababa"}}/>
                        </div>
                    )}                    
                        
                    {editPass && (
                        <div className="input-container">
                            <label>New Password </label>
                            <input type="password" name="password" />
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" />
                        </div>
                    )}
                    {!editPass && (
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="password" value={password} readOnly style={{
                            pointerEvents: "none",
                            backgroundColor: "#bababa"}}/>
                        </div>
                    )}

                    {!editEmail &&! editPass && (
                        <div className="button-container">
                            <button className="button" type={"button"} onClick={_handleEditEmail}>Edit Email</button>
                            <button className="button" type={"button"} onClick={_handleEditPass}>Edit Password</button>
                        </div>
                    )}
                    {(editEmail || editPass) && (
                        <div className="button-container">
                            <button className="button" type={"button"} onClick={_handleEditCancel}>Cancel</button>
                            <button className="button" type={"submit"} onClick={_handleEditConfirm}>Confirm</button>
                        </div>
                    )}
 
                    {error && (
                        <div className="error">
                            <br></br>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="success">
                            <br></br>
                            {success}
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