const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const db = require("./mysql");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/api/bookings', (req, res) => {
    const { name, email, gender, date_of_birth, phone, address, message } = req.body;

    // Check for required fields
    if (!name || !gender || !date_of_birth || !phone || !address) {
        return res.status(400).json({ success: false, message: 'Name, Gender, Date of Birth, Phone, and Address are required.' });
    }

    // Validate date_of_birth format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date_of_birth)) {
        return res.status(400).json({ success: false, message: 'Invalid Date of Birth format. Use YYYY-MM-DD.' });
    }

    // Validate gender
    if (!['Male', 'Female', 'Other'].includes(gender)) {
        return res.status(400).json({ success: false, message: 'Gender must be Male, Female, or Other.' });
    }

    const query = `
        INSERT INTO bookings (name, email, gender, date_of_birth, phone, address, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, email || null, gender, date_of_birth, phone, address, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json({ success: true, message: 'Booking submitted successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});