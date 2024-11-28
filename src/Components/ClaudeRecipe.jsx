import React, { useEffect, useState } from "react";
import { getRecipeFromMistral } from "./Ai"; // Import the getRecipeFromMistral function

export default function ClaudeRecipe({ ingredients, error }) {
    const [recipe, setRecipe] = useState("");  // Initialize recipe as an empty string
    const [loading, setLoading] = useState(false);

    // Fetch the recipe from the backend whenever ingredients change
    useEffect(() => {
        const fetchRecipe = async () => {
            if (ingredients.length > 0) {
                setLoading(true);  // Start loading state
                try {
                    const fetchedRecipe = await getRecipeFromMistral(ingredients);
                    console.log(fetch)
                    
                    // Ensure we handle a valid response before setting state
                    if (fetchedRecipe) {
                        setRecipe(fetchedRecipe);  // Set the fetched recipe
                    } else {
                        setRecipe("Sorry, no recipe found for the given ingredients.");
                    }
                } catch (err) {
                    console.error("Error fetching recipe:", err);
                    setRecipe("Sorry, something went wrong while fetching the recipe.");
                } finally {
                    setLoading(false);  // Stop loading state
                }
            }
        };

        fetchRecipe();  // Call the function to fetch the recipe
    }, [ingredients]);  // Re-run when ingredients change

    // Conditional rendering based on the state
    if (loading) {
        return <p>Loading your recipe...</p>;  // Display loading state
    }

    if (error) {
        return <p className="error-message">{error}</p>;  // Display error message if any
    }

    if (!recipe) {
        return <p>No recipe found. Please add ingredients and try again.</p>;  // Display a message if no recipe is available
    }

    return (
        <section className="recipe-section">
            <h2>Recipe Suggestion</h2>
            <div className="recipe-content">
                <div dangerouslySetInnerHTML={{ __html: recipe }} />
                {/* Optionally render the recipe in markdown or HTML */}
            </div>
        </section>
    );
}
