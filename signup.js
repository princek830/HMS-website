document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("role");
  const doctorFields = document.getElementById("doctorFields");
  const signupForm = document.getElementById("signupForm");

  // Show doctor fields
  roleSelect.addEventListener("change", () => {
    doctorFields.style.display =
      roleSelect.value === "doctor" ? "block" : "none";
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      const data = await res.json();

      if (!data.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      if (role === "doctor") {
        alert("Doctor signup submitted. Wait for admin approval.");
      } else {
        alert("Patient signup successful!");
      }

      window.location.href = "login.html";

    } catch (error) {
      console.error(error);
      alert("Server error during signup");
    }
  });
});