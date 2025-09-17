document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value.trim(); // here use email input
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user by email + password
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  // If doctor and not approved yet
  if (user.role === "doctor" && user.status !== "approved") {
    alert("Your account is still pending admin approval.");
    return;
  }

  // Save the whole user object for session
localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert(`Login successful! Redirecting to ${user.role} portal...`);

  if (user.role === "patient") {
    window.location.href = "patient-portal.html";
  } else if (user.role === "doctor") {
    window.location.href = "doctor-portal.html";
  } else if (user.role === "admin") {
    window.location.href = "admin-portal.html";
  } else {
    window.location.href = "index.html";
  }
});
