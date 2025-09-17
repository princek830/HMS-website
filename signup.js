document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("role");
  const doctorFields = document.getElementById("doctorFields");
  const signupForm = document.getElementById("signupForm");

  // Show doctor fields if role is doctor
  roleSelect.addEventListener("change", () => {
    doctorFields.style.display = roleSelect.value === "doctor" ? "block" : "none";
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
      alert("Please fill all required fields!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
      alert("User already exists. Please login.");
      return;
    }

    let userData = { role, username, email, password };

    if (role === "doctor") {
      const specialization = document.getElementById("specialization").value.trim();
      const degree = document.getElementById("degree").value.trim();
      const license = document.getElementById("license").value.trim();
      const aadhar = document.getElementById("aadhar").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const photoFile = document.getElementById("photo").files[0];

      if (!specialization || !degree || !license || !aadhar || !mobile || !photoFile) {
        alert("Please fill all doctor details including photo!");
        return;
      }

      // Convert photo to Base64
      const photoBase64 = await fileToBase64(photoFile);

      userData = {
        ...userData,
        specialization,
        degree,
        license,
        aadhar,
        mobile,
        photo: photoBase64, // Store as Base64
        status: "pending"
      };

      alert("Doctor signup submitted. Waiting for admin approval.");
    } else {
      alert("Patient signup successful!");
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "login.html";
  });

  // Convert file to Base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
});
