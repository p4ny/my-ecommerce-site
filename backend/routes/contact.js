const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const { fname, lname, email, subject, message } = req.body;

  if (!fname || !lname || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const contactFilePath = path.join(__dirname, "..", "data", "contact.json");

  try {
    // Read existing contacts or initialize empty array
    let contacts = [];
    if (fs.existsSync(contactFilePath)) {
      const fileData = fs.readFileSync(contactFilePath, "utf8");
      contacts = JSON.parse(fileData);
    }

    // Create new contact entry
    const newContact = {
      id: contacts.length + 1,
      fname,
      lname,
      email,
      subject,
      message,
      submittedAt: new Date(),
    };

    // Add to contacts array
    contacts.push(newContact);

    // Save back to file
    fs.writeFileSync(contactFilePath, JSON.stringify(contacts, null, 2));

    console.log("Contact form submitted:", newContact);
    res.status(200).json({ status: "Message Received" });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    res.status(500).json({ error: "Failed to save your message" });
  }
});

module.exports = router;
