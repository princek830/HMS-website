document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the matching user by email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password. Please try again.");
      return;
    }

    // Block doctor login until approved
    if (user.role === "doctor" && user.status !== "approved") {
      alert("Doctor account not approved yet. Please wait for admin approval.");
      return;
    }

    // Save login session
    localStorage.setItem("loggedInUser", JSON.stringify(user));

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
});
