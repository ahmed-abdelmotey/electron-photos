const electron = require('electron');
const {app , BrowserWindow , ipcMain, Menu} = electron;
const images = require('./images')
const menuTemplate = require('./menu')

let mainWindow = null;
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 893,
        height: 725,
        resizable: false
    })

    mainWindow.loadURL(`file://${__dirname}/capture.html`)
    // mainWindow.webContents.openDevTools();
    images.makeImageDir(images.getPicturesDir(app))
    mainWindow.on('close',()=>{
        mainWindow = null;
    })

    const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
    Menu.setApplicationMenu(menuContents)
})

ipcMain.on('image-capture',(evt , bytes)=>{
    images.save(images.getPicturesDir(app), bytes, imgPath => {images.cache(imgPath)});
})

ipcMain.on('image-remove', (evt , index)=> {
    images.removeImg(index, () => {
        evt.sender.send('image-removed' , index)
    })
})
