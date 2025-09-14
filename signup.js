document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("role");
  const doctorFields = document.getElementById("doctorFields");
  const signupForm = document.getElementById("signupForm");

  // Show doctor fields if role is doctor
  roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "doctor") {
      doctorFields.style.display = "block";
    } else {
      doctorFields.style.display = "none";
    }
  });

  // Handle form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let userData = { role, username, email, password };

    // Add doctor-specific data
    if (role === "doctor") {
      const specialization = document.getElementById("specialization").value;
      const degree = document.getElementById("degree").value;
      const license = document.getElementById("license").value;

      userData = { ...userData, specialization, degree, license, status: "pending" };
      alert("Doctor signup submitted. Waiting for admin approval.");
    } else {
      alert("Patient signup successful!");
    }

    // Save data in localStorage (simulate DB)
    localStorage.setItem(email, JSON.stringify(userData));

    // Redirect to login
    window.location.href = "login.html";
  });
});
