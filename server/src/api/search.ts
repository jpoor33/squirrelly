import { Router, Request, Response } from "express";
import FavSquirrels from "../models/favsquirrels.js"; 

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<Response> => {
  const { q } = req.body;
  
  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }
  
  try {
    const regex = new RegExp(q, "i"); 
    const results = await FavSquirrels.find({ squirrelName: { $regex: regex } });
    return res.json(results);
  } catch (err) {
    console.error("Error during search:", err);
    return res.status(500).json({ error: "Server error while searching for squirrels." });
  }
});

export default router;