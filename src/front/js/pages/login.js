import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom'

export const Login = () => {
	const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = (e) => {
        e.preventDefault();
        actions.login(email, password);
    }

	return (
		<div className="p-5">
            <h1>Log in</h1>
            TOKEN: {store.token}
			<form className="mt-5" onSubmit={loginFunction}>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                <Link to="/reset">
                    <div id="passwordHelp" className="form-text">I forgot my password.</div>
                </Link>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {store.token ? <Link to="/private">GO TO PRIVATE</Link> : ''}
		</div>
	);
};
