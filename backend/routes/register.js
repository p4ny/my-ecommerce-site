const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const { firstName, lastName, email, password, category, occupation } =
    req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !category ||
    !occupation
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userFilePath = path.join(__dirname, "..", "data", "user.json");

  try {
    // Read the existing users or initialize an empty array
    let users = [];
    if (fs.existsSync(userFilePath)) {
      const fileData = fs.readFileSync(userFilePath, "utf8");
      users = JSON.parse(fileData);
    }

    // Check if email already exists (Task 2.5)
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email has already been used." });
    }

    // Create new user object
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password,
      category,
      occupation,
      registeredAt: new Date(),
    };

    // Add to users array
    users.push(newUser);

    // Save back to file
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

    // Send success response
    res.status(200).json({ message: "Register successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

module.exports = router;
