// Handle face scan button click
document.getElementById("scanBtn").addEventListener("click", () => {
  alert("Face scanning triggered!");
  // TODO: Connect this to your Python logic or backend
});

// Function to update the clock every second
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Optional: set to false if you want 24-hour format
  });
  document.getElementById('clock').textContent = timeString;
}

// Start the clock
setInterval(updateClock, 1000);
updateClock();
