import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"

export const Private = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (store.token) {
            console.log('everything okay')
        }
        else {
            navigate('/login')
        }
    }, [])

	return (
		<div className="p-5">
            PRIVATE CONTENT (ONLY LOGGED IN USERS CAN SEE)
		</div>
	);
};
