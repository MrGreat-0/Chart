const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

// Serve static files (your HTML, JS, CSS)
app.use(express.static(__dirname));

// Your Zoho access token
const ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN; // Replace with your current valid token

// API route to fetch leads from Zoho
app.get("/leads", async (req, res) => {
    try {
        const response = await axios.get(
            "https://www.zohoapis.in/crm/v4/Leads?fields=id,Lead_Status",
            {
                headers: {
                    Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`
                }
            }
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching leads",
            error: err.response?.data || err.message
        });
    }
});

// Serve index.html as default
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(process.env.PORT || 3000, () => console.log("Server running on http://localhost:3000"));
