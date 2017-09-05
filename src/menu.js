const electron = require('electron');
const app = electron.app;

function enableCycleEffect(items){
  const effectsIndexStart = 2;
  const selectedEffect = items.findIndex(item => item.checked)
  const nextIndex = selectedEffect + 1 < items.length ? selectedEffect + 1 : effectsIndexStart;
  items[nextIndex].checked = true;
}


module.exports = mainWindow => {
  const name = 'file'
  const template = [
    {
      label: name,
      submenu: [
        // {
        //   label: 'About ' + name,
        //   role: 'about'
        // },
        // {type: 'separator'},
        // {
        //   lable: 'Hide ' + name,
        //   accelerator: 'Control+H',
        //   role: 'hide'
        // },
        // {
        //   label: 'hide others',
        //   accelerator: 'Control+Shift+H',
        //   role: 'hideothers'
        // },
        // {
        //   label: 'show all',
        //   role: 'unhide'
        // },
        // {type: 'separator'},
        {
          label: 'Quit',
          accelerator: 'Control+Q',
          role: 'close'
        },    
      ]
    },
    {
      label: 'effects',
      submenu: [
        {
          label: 'cycle',
          accelerator: 'Shift+CmdOrCtrl+E',
          click: menuItem => {
            enableCycleEffect(menuItem.menu.items);
            mainWindow.webContents.send('effect-cycle')
          }
        },
        {type: 'separator'},
        {
          label:'vanilla',
          type:'radio',
          click: ()=> mainWindow.webContents.send('effect-choose')
        },
        {
          label:'ascii',
          type:'radio',
          click: ()=> mainWindow.webContents.send('effect-choose','ascii')
        },
        {
          label:'daltonize',
          type:'radio',
          click: ()=> mainWindow.webContents.send('effect-choose','daltonize')
        },
        {
          label:'hex',
          type:'radio',
          click: ()=> mainWindow.webContents.send('effect-choose','hex')
        }
      ]
    }  
  ]

  return template;
}