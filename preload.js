const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runFaceScan: () => ipcRenderer.send('run-face-scan'),
  onScanResult: (callback) => ipcRenderer.on('scan-result', (event, result) => callback(result))
});

    console.log("runFaceScan called from renderer"); // Debug log

    exec('"D:/Facerecognitonbasedattendancesystem/.venv/Scripts/python.exe" "D:/Facerecognitonbasedattendancesystem/scan.py"', (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        alert(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      console.log(`stdout: ${stdout}`);
      alert(stdout); // Show the scan result
    
  
});
