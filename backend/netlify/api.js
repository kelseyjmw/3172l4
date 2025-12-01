import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const api = express();
const router = express.Router();

const API_KEY = process.env.UNSPLASH_API_KEY;

// GET /api/meme/random
router.get("/meme/random", async (req, res) => {
    try {
        if (!API_KEY) {
            res.status(500).json({error: "Missing Unsplash API Key"});
        }
        
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=funny&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID ${API_KEY}`
                }
            }
        );

        const data = await response.json();

        if (!data || !data.urls || !data.urls.regular) {
            return res.status(404).json({error: "No image found"});
        }

        res.json({
            imageUrl: data.urls.regular
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({error: "Server error"});
    }
});

// Mount router
api.use("/api/", router);

// Export serverless handler
export const handler = serverless(api);