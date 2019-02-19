const {app,BrowserWindow,Tray,Menu} = require('electron');
const nativeImage = require('electron').nativeImage
const path = require('path');

let tray = null

function createWindow(){
    win = new  BrowserWindow({width:365,height:660,show:false,icon:"image/icon.ico"});
    //,kiosk:false,maximizable:false,maxWidth:365,maxHeight:660,minWidth:365,minHeight:660
    win.loadFile("html/login.html");
    win.on("ready-to-show",()=>{
        win.show();
    })
    let image = nativeImage.createFromPath("image/icon.ico");
    tray = new Tray(image);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    win.on('closed',()=>{
        console.log('closed');
        win = null;
    });
}

app.on("ready",createWindow);
app.on("window-all-closed",()=>{
    console.log("window-all-closed");
    if(process.platform != 'darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    console.log('activate');
    if(win == null){
        createWindow();
    }
});