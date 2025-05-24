const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let splash, mainWindow;

function createWindow() {
  splash = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    show: true,
  });

  splash.loadFile('splash.html');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      sandbox: false
    }
  });

  mainWindow.loadFile('index.html');

  setTimeout(() => {
    splash.close();
    mainWindow.show();
  }, 4000);
}

app.whenReady().then(createWindow);

// ✅ Executes your actual face recognition + attendance script (main.py)
ipcMain.on('run-face-scan', (event) => {
  console.log("Received face scan request");

  exec('"D:/Facerecognitonbasedattendancesystem/.venv/Scripts/python.exe" "D:/Facerecognitonbasedattendancesystem/main.py"', (error, stdout, stderr) => {
    let result = '';
    if (error) {
      result = `Error: ${error.message}`;
      console.error("Python Error:", error.message);
    } else if (stderr) {
      result = `Stderr: ${stderr}`;
      console.error("Python Stderr:", stderr);
    } else {
      result = stdout;
      console.log("Python Output:", stdout);
    }

    event.sender.send('scan-result', result);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
