// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// In-memory users database (temporary)
let users = [
  { email: "admin@hms.com", password: "admin123", role: "admin" } // Default Admin
];

// 📝 Signup route for patients
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  users.push({ email, password, role: "patient" });
  res.send("Patient signup successful!");
});

// 🔑 Login route (admin + patient)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  if (user.role === "admin") {
    res.send("Welcome Admin! Redirecting to admin dashboard...");
  } else {
    res.send("Welcome Patient! Redirecting to patient portal...");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
