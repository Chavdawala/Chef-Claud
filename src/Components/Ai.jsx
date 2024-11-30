const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://chef-claud.vercel.app' 
  : 'http://localhost:3000'; // Replace with your local dev URL





export async function getRecipeFromMistral(ingredientsArr) {
    try {
        // Make a POST request to the backend API to get the recipe
        const response = await fetch(`${baseUrl}/api/get-recipe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch recipe from backend");
        }

        const data = await response.json();
        return data[0].generated_text ; // Assuming the response contains the recipe in data.recipe
        
    } catch (err) {
        console.error("Error fetching recipe:", err);
        return "Sorry, something went wrong while fetching the recipe. Please try again.";
    }
}
