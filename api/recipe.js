import axios from "axios";

export default async function handler(req, res) {
  // Use VITE_ prefix for Vite projects
  const apiUrl = process.env.VITE_API_URL;
  const apiKey = process.env.VITE_HF_API_KEY;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const { ingredients } = req.body;
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
}