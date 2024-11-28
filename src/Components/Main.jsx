import React from "react";
import IngredientsList from './IngredientsList';
import ClaudeRecipe from './ClaudeRecipe';
import { getRecipeFromMistral } from "./Ai";
import './Main.css';

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [error, setError] = React.useState(null);

    // Handle ingredient form submission
    function addIngredient(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient").trim();

        if (newIngredient) {
            setIngredients((prevIngredients) => {
                const ingredientsSet = new Set(prevIngredients);
                ingredientsSet.add(newIngredient);
                return [...ingredientsSet];
            });
        }
        event.target.reset(); // Reset the input field after submission
    }

    // Handle clear ingredients
    function clearIngredients() {
        setIngredients([]);
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} />}
            
            <button type="button" onClick={clearIngredients}>
                Clear Ingredients
            </button>

            <ClaudeRecipe ingredients={ingredients} error={error} />
        </main>
    );
}
