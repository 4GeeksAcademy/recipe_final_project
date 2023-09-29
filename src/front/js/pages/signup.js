import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signupFunction = (e) => {
        e.preventDefault();
        actions.signup(email, username, password);
    }

	return (
		<div className="p-5">
            <h1>Sign Up</h1>
			<form className="mt-5" onSubmit={signupFunction}>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="username" className="form-label">Username</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
		</div>
	);
};
