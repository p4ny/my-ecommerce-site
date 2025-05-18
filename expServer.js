const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/classes", (req, res) => {
  try {
    const classData = fs.readFileSync(
      path.join(__dirname, "json", "class_sunday.json"),
      "utf8"
    );
    res.json(JSON.parse(classData));
  } catch (err) {
    console.error("Error reading class data:", err);
    res.status(500).json({ error: "Could not fetch class data" });
  }
});

app.post("/api/contact", require("./backend/routes/contact"));

app.post("/api/subscribe", require("./backend/routes/subscribe"));

app.get("/api/subjects", (req, res) => {
  try {
    const subjectData = fs.readFileSync(
      path.join(__dirname, "json", "contact_subject.json"),
      "utf8"
    );
    res.json(JSON.parse(subjectData));
  } catch (err) {
    console.error("Error reading subject data:", err);
    res.status(500).json({ error: "Could not fetch subject data" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
