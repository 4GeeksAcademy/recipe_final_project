import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const BookDetails = () => {
	const { store, actions } = useContext(Context);
    const params = useParams();
    const [bookInfo, setBookInfo] = useState({});

    useEffect(() => {
        actions.getBookInformationById(params.book_id, setBookInfo)
    }, [])

	return (
		<div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{bookInfo.title}</h5>
                    <p className="card-text">{bookInfo.author}</p>
                    {bookInfo.description}
                    <a href="#" className="btn btn-primary">Add recipe to favorites</a>
                </div>
            </div>
        </div>
	);
};
