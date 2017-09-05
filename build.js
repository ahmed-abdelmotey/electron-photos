var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './electron-photos-win32-x64',
  outputDirectory: './build',
  authors: 'ahmed abdelmotey',
  exe: 'electron-photos.exe',
  description:"a sample electron app",
  version: "1.0.0"
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));