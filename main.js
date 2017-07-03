const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

//Module for OS information
const os = require('os')

const path = require('path')
const url = require('url')

const disk = require('diskinfo');



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//

//Disk information
//


var disks;
var tmp = [];
disk.getDrives(function(err, aDrives) {

      for (var i = 0; i < aDrives.length; i++) {
            console.log('Drive ' + aDrives[i].filesystem);
            getD(aDrives[i]);
      }
}, function(){
   console.log("")
});
function getD(drive){
  tmp.push(drive);
}

console.log(tmp);
////funckja



//CPU architecture
//os

let osArch  = os.arch();
let osCPU = os.cpus();
let osPlatform = os.platform();
let osRelease = os.release();

let osCpuModel = osCPU[1].model;
let osCpuMHZ = osCPU[1].speed;

let arch =  {
    "osArch": osArch ,
    "osCpuModel": osCpuModel,
    "osCpuMHZ": osCpuMHZ,
    "osPlatform": osPlatform,
    "osRelease": osRelease
  };

//console.log(arch);
//console.log(osArch);



//ipc data transfer main.js <=> renderer.js
//
const {ipcMain} = require('electron')
ipcMain.on('ping-signal', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('create-os-table', arch)
  //event.sender.send('asynchronous-reply1', disk)
})


// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg)  // prints "ping"
//   event.returnValue = 'pong'
// })
