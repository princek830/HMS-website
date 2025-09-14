// login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Fetch saved users from signup
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the matching user by username & password
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Invalid username or password. Please try again.");
    return;
  }

  // Save login session
  localStorage.setItem("loggedInUser", user.username);
  localStorage.setItem("userRole", user.role);

  alert(`Login successful! Redirecting to ${user.role} portal...`);

  // Redirect based on role
  if (user.role === "patient") {
    window.location.href = "patient-portal.html";
  } else if (user.role === "doctor") {
    window.location.href = "doctor-portal.html";
  } else if (user.role === "admin") {
    window.location.href = "admin-portal.html";
  } else {
    window.location.href = "index.html"; // fallback
  }
});
