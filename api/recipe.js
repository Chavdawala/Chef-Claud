import axios from "axios";
import cors from "cors";
import { json } from "express";

const handler = async (req, res) => {
  // Your environment variables
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_HF_API_KEY;

  // CORS middleware
  const corsMiddleware = cors();
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method === "POST") {
    const { ingredients } = req.body; // Get ingredients from the request body
    try {
      const response = await axios.post(
        apiUrl,
        {
          inputs: `I have ${ingredients.join(", ")}. Give me a recipe.`,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
