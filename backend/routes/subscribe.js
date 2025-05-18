const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

/*
1.read existing file
2.parse data into array
3.add new data into array
4.save array into file
*/

router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const subscribeFilePath = path.join(
    __dirname,
    "..",
    "data",
    "subscribe.json"
  );

  try {
    // Read existing subscriptions or initialize empty array
    let subscriptions = [];
    if (fs.existsSync(subscribeFilePath)) {
      const fileData = fs.readFileSync(subscribeFilePath, "utf8");
      subscriptions = JSON.parse(fileData);
    }

    // Check if email already exists
    const existingSubscription = subscriptions.find(
      (sub) => sub.email === email
    );
    if (existingSubscription) {
      return res.status(200).json({ status: "You are already subscribed" });
    }

    // Create new subscription
    const newSubscription = {
      id: subscriptions.length + 1,
      email,
      subscribedAt: new Date(),
    };

    // Add to subscriptions array
    subscriptions.push(newSubscription);

    // Save back to file
    fs.writeFileSync(subscribeFilePath, JSON.stringify(subscriptions, null, 2));

    console.log("New subscription:", newSubscription);
    res.status(200).json({ status: "Subscription successful" });
  } catch (error) {
    console.error("Error during subscription:", error);
    res.status(500).json({ error: "Failed to process subscription" });
  }
});

module.exports = router;
