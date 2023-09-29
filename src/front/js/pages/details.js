import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Details = () => {
	const { store, actions } = useContext(Context);
    const params = useParams();
    const [recipeInfo, setRecipeInfo] = useState({});
    const ingredientsAttributes = ['strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4', 'strIngredient5']

    useEffect(() => {
        actions.getRecipeById(params.recipe_id, setRecipeInfo)
        actions.getBestSellerBooks()
    }, [])

	return (
		<div className="container">
            <div className="card">
                <img src={recipeInfo.strMealThumb} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{recipeInfo.strMeal}</h5>
                    <p className="card-text">{recipeInfo.strInstructions}</p>
                    <a href="#" className="btn btn-primary">Add recipe to favorites</a>
                </div>
            </div>
            <h3>Ingredients:</h3>
            <ul>
                {ingredientsAttributes.map(attr => (
                    <li>{recipeInfo[attr]}</li>
                ))}
            </ul>
        </div>
	);
};
