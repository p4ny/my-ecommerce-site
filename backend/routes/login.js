const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    const userFilePath = path.join(__dirname, '..', 'data', 'user.json');
    
    try {
        // Check if user file exists
        if (!fs.existsSync(userFilePath)) {
            return res.status(400).json({ message: "Incorrected Username" });
        }
        
        // Read the users file
        const fileData = fs.readFileSync(userFilePath, 'utf8');
        const users = JSON.parse(fileData);
        
        // Find user by email
        const user = users.find(user => user.email === email);
        
        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "Incorrected Username" });
        }
        
        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrected Password." });
        }
        
        // Successful login
        res.status(200).json({ message: "Login successfully." });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router; 