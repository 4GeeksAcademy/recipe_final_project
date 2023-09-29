import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom'

export const Reset = () => {
	const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");

    const resetFunction = (e) => {
        e.preventDefault();
        actions.sendForgotPasswordEmail(email, alert);
    }

	return (
		<div className="p-5">
            <h1>Reset your password</h1>
			<form className="mt-5" onSubmit={resetFunction}>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
		</div>
	);
};
