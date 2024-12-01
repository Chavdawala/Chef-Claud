export async function getRecipeFromMistral(ingredientsArr) {
    try {
        // Use relative URL for API calls
        const response = await fetch('/api/recipe', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch recipe from backend");
        }

        const data = await response.json();
        return data[0].generated_text; // Assuming the response contains the recipe in data[0].generated_text
        
    } catch (err) {
        console.error("Error fetching recipe:", err);
        return "Sorry, something went wrong while fetching the recipe. Please try again.";
    }
}
