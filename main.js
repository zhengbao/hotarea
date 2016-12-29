const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

var force_quit = false;
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1200, height: 768 })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // mainWindow.webContents.openDevTools()

    mainWindow.on('close', function(e) {
        if (!force_quit) {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

const Tray = electron.Tray;
const Menu = electron.Menu;
var fs = require('fs');

let tray = null
app.on('ready', () => {
    var logoPath;
    // logo文件放在与main.js 相同的开发目录
    // 通过 electron-packager 打包时，开发目录整体会作为打包生成目录的子目录 resource\app\ 下的文件
    // 执行打包的exe文件，main.js 的目录上下文是根目录，而logo文件在子目录，所以需要适配
    if (fs.existsSync('./logo.ico')) {
        logoPath = './logo.ico';
    } else
        logoPath = './resources/app/logo.ico';

    tray = new Tray(logoPath);
    const contextMenu = Menu.buildFromTemplate([{
            label: '显示窗口',
            type: 'normal',
            click: function() {
                mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
            }
        }, {
            label: '显示在最前',
            type: 'normal',
            click: function() {
                mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
            }
        },
        // {label: '建议反馈', type: 'normal', click: function(){
        //     mainWindow.show();
        //     // var mask = mainWindow.document.getElementsByClassName('mask')[0];
        //     //             mask.style.display = 'block';
        //     //             var contact = mainWindow.document.getElementsByClassName('contact')[0];
        //     //             contact.style.display = 'block';

        //     //             var donate = mainWindow.document.getElementsByClassName('donate')[0];
        //     //             donate.style.display = 'none';

        // }},
        {
            label: '退出',
            type: 'normal',
            click: function() {
                force_quit = true;
                mainWindow.close()
                    // mainWindow.hide()
            }
        }
    ]);
    tray.setToolTip('ruce');
    tray.on('click', function() {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    });
    tray.setContextMenu(contextMenu);
})
