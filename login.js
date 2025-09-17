document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Add default admin if missing
  if (!users.some(u => u.role === "admin")) {
    users.push({
      role: "admin",
      username: "Admin",
      email: "admin@hms.com",
      password: "admin123"
    });
    localStorage.setItem("users", JSON.stringify(users));
    console.log("✅ Default admin added (admin@hms.com / admin123)");
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // ✅ FIX: match IDs from login.html
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("Invalid email or password. Please try again.");
        return;
      }

      if (user.role === "doctor" && user.status !== "approved") {
        alert("Your account is still pending admin approval.");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("userRole", user.role);

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
  }
});
