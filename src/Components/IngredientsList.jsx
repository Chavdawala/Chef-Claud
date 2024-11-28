import React from "react";

export default function IngredientsList({ ingredients, toggleRecipeShown, recipeShown }) {
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            {ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={toggleRecipeShown}>
                        {recipeShown ? "Hide recipe" : "Get a recipe"}
                    </button>
                </div>
            )}
        </section>
    );
}
