import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useSearchParams } from 'react-router-dom'

export const NewPassword = () => {
	const { store, actions } = useContext(Context);
    const [searchParams] = useSearchParams();

    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");

    const resetFunction = (e) => {
        e.preventDefault();
        const token = searchParams.get('token');
        if (!token) alert("We cannot reset the password");
        else if (password !== repeat) alert("Hey! Passwords do not match");
        else {
            actions.resetPassword(token, password, alert);
        }
    }

	return (
		<div className="p-5">
            <h1>Reset your password</h1>
			<form className="mt-5" onSubmit={resetFunction}>
            <div className="mb-3">
                <label for="password" className="form-label">New password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Repeat new password</label>
                <input type="password" onChange={(e) => setRepeat(e.target.value)} className="form-control" id="repeat" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
		</div>
	);
};
