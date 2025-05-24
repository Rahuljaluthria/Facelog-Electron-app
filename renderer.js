// document.addEventListener('DOMContentLoaded', () => {
//     const toggle = document.getElementById('themeToggle');
//     const themeLabel = document.getElementById('themeLabel');
//     const root = document.documentElement;
  
//     // Default theme
//     let isDark = true;
  
//     toggle.addEventListener('change', () => {
//       isDark = !isDark;
  
//       if (isDark) {
//         root.style.setProperty('--bg-color', '#121212');
//         root.style.setProperty('--text-color', 'white');
//         themeLabel.textContent = 'Dark Mode';
//       } else {
//         root.style.setProperty('--bg-color', '#f5f5f5');
//         root.style.setProperty('--text-color', '#222');
//         themeLabel.textContent = 'Light Mode';
//       }
//     });
//   });
  
const { ipcRenderer } = require('electron');

// Login function (already present)
function login() {
  const name = document.getElementById("username").value;
  const uid = document.getElementById("uid").value;

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, uid })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed. Check your name and UID.");
    }
  });
}

// Face scan button logic (on dashboard.html)
window.addEventListener('DOMContentLoaded', () => {
  const scanBtn = document.getElementById('faceScanBtn');
  const statusDiv = document.getElementById('statusMessage');

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      statusDiv.innerText = 'Scanning face...';
      ipcRenderer.send('start-face-scan');
    });

    ipcRenderer.on('scan-result', (event, message) => {
      statusDiv.innerText = message;
    });
    
  }
});
