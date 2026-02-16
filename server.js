const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const GOLD_API_KEY = process.env.GOLD_API_KEY;

app.get("/prices", async (req, res) => {
  try {
    const goldRes = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: { "x-access-token": GOLD_API_KEY }
    });

    const silverRes = await fetch("https://www.goldapi.io/api/XAG/INR", {
      headers: { "x-access-token": GOLD_API_KEY }
    });

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();

    res.json({
      gold: goldData.price,
      silver: silverData.price
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
