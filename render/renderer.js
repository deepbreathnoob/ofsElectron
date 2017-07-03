// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// In renderer process (web page).
const {ipcRenderer} = require('electron')


//console.log(ipcRenderer.sendSync('synchronous-message', 'arch')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg); // prints "pong"
//   // $(document).ready(function(){
//   //       $("#arch1").text('HAHAH');
//   //
//   // });
// })
// ipcRenderer.send('asynchronous-message', 'arch')

//ipcRenderer.send('asynchronous-message', 'ping')
var os = {};




function createOsTable(os) {
  $("#arch1").text(function() {
    return os.osArch
  });
  $("#cpuModel").text(function() {
    return os.osCpuModel
  });
  $("#osCpuMHZ").text(function() {
    return os.osCpuMHZ
  });
  $("#osPlatform").text(function() {
    return os.osPlatform
  });
  $("#osRelease").text(function() {
    return os.osRelease
  });
}
function createDiskTable(disk) {

}
ipcRenderer.on('create-os-table', (event, arg) => {
  console.log(arg) // prints "pong"
  createOsTable(arg);
})
ipcRenderer.on('asynchronous-reply1', (event, arg) => {
//  console.log(arg) // prints "pong"
  createDiskTable(arg);
})

ipcRenderer.send('ping-signal', 'ping')


//<td id="arch1">tesyt</td>



// $("#arch1").text(function() {
//   return arg.osArch
// });
// $("#cpuModel").text(function() {
//   return arg.cpuModel
// });
// $("#osCpuMHZ").text(function() {
//   return arg.osCpuMHZ
// });
// $("#osPlatform").text(function() {
//   return arg.osPlatform
// });
// $("#osRelease").text(function() {
//   return arg.osRelease
// });
