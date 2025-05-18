const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/subscribe", require("./routes/subscribe"));

app.get("/", (req, res) => {
  res.json({ message: "API Server is running" });
});

app.listen(PORT, () => {
  console.log(`API Server is running at http://localhost:${PORT}`);
});
