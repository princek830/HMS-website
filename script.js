<script>
  // Example data for logic
  const lastVisitDate = new Date("2025-06-25"); // Simulated last visit
  const today = new Date();
  const daysSinceLastVisit = Math.floor((today - lastVisitDate) / (1000 * 60 * 60 * 24));

  let suggestion = "👨‍⚕️ Hello! How can I assist you today?";

  if (daysSinceLastVisit > 30) {
    suggestion = "🕒 It’s been over a month since your last checkup. Want to book an appointment?";
  } else if (daysSinceLastVisit > 15) {
    suggestion = "📅 Need help finding your last visit records?";
  } else {
    suggestion = "✅ Everything seems fine. Let us know if you need help.";
  }

  // Show suggestion box after a few seconds
  window.onload = function () {
    document.getElementById("suggestion-text").innerText = suggestion;
    setTimeout(() => {
      document.getElementById("ai-suggestion-box").style.display = "block";
    }, 2000);
  };

  function closeSuggestion() {
    document.getElementById("ai-suggestion-box").style.display = "none";
  }
</script>
