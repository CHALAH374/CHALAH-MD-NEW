const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve HTML files like index.html

// Routes
app.use("/code", require("./pair"));
app.use("/connect", require("./connect")); // <-- NEW

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
