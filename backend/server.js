require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware: Allows our future Next.js frontend to talk to this API
app.use(cors());
app.use(express.json());

// Database Connection Pooling
// This is a great architecture talking point: A 'Pool' allows multiple users 
// to request data at the exact same time without crashing the server.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// The API Endpoint
// When someone visits /api/patients, it runs this database query
app.get('/api/patients', async (req, res) => {
    try {
        console.log("Fetching patient records from database...");

        // Query the Postgres database for the data you scraped
        const result = await pool.query('SELECT * FROM scraped_quotes ORDER BY id DESC LIMIT 10');

        // Send the data back as JSON with a 200 (Success) status code
        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Database error details:", {
            message: error.message,
            code: error.code,
            detail: error.detail
        });
        res.status(500).json({ 
            error: "Failed to fetch records",
            details: error.message 
        });
    }
});

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
    console.log(`Test the API here: http://localhost:${PORT}/api/patients`);
});