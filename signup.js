document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("role");
  const doctorFields = document.getElementById("doctorFields");
  const signupForm = document.getElementById("signupForm");

  // Show doctor fields if role is doctor
  roleSelect.addEventListener("change", () => {
    doctorFields.style.display = roleSelect.value === "doctor" ? "block" : "none";
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
      alert("Please fill all required fields!");
      return;
    }

    // Get existing users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      alert("User already exists. Please login.");
      return;
    }

    let userData = { role, username, email, password };

    if (role === "doctor") {
      const specialization = document.getElementById("specialization").value.trim();
      const degree = document.getElementById("degree").value.trim();
      const license = document.getElementById("license").value.trim();

      userData = { ...userData, specialization, degree, license, status: "pending" };
      alert("Doctor signup submitted. Waiting for admin approval.");
    } else {
      alert("Patient signup successful!");
    }

    // Save the user
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login
    window.location.href = "login.html";
  });
});
