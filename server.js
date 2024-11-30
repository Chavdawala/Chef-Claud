const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors package
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Load API URL and API Key from environment variables
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_HF_API_KEY;
const port = process.env.PORT
// Use CORS middleware to enable cross-origin requests
app.use(cors()); // This will enable CORS for all routes

// Middleware to parse JSON body
app.use(express.json());

app.post("/api/get-recipe", async (req, res) => {
    const { ingredients } = req.body; // Get ingredients from the request body
    console.log(ingredients);
    try {
        // Make a POST request to Hugging Face API using Axios
        const response = await axios.post(
            apiUrl, // Use the apiUrl from the environment variable
            {
                inputs: `I have ${ingredients.join(", ")}. Give me a recipe.`,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`, // Add API key from the environment variable
                },
            }
        );
        console.log(response.data);
        // Send back the recipe response to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch recipe" });
    }
});

// Start the server on port 3000
app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
