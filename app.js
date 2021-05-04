const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");

let browserWinder

function createWindow () {
  browserWinder = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  browserWinder.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/algo-token-generator/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  // browserWinder.webContents.openDevTools()

  browserWinder.on('closed', function () {
    browserWinder = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (browserWinder === null) createWindow()
})
