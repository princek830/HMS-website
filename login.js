document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    let user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert("Invalid username or password!");
        return;
    }

    // Save current logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`Welcome ${user.username}!`);

    // Redirect based on role
    if (user.role === "patient") {
        window.location.href = "patient-portal.html";
    } else if (user.role === "doctor") {
        window.location.href = "doctor-dashboard.html";
    } else if (user.role === "admin") {
        window.location.href = "admin-dashboard.html";
    }
});
