const electron = require('electron');
const remote = electron.remote;
const Menu = remote.Menu;

const template = [{
        label: '操作',
        submenu: [{
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload();
                }
            }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            }, {
                label: '审查元素',
                accelerator: 'CmdOrCtrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            }

        ]
    },
    {
        label: '关于',
        role: 'contact',
        submenu: [{

            label: '联系作者',
            click() {
                var mask = document.getElementsByClassName('mask')[0];
                mask.style.display = 'block';
                var contact = document.getElementsByClassName('contact')[0];
                contact.style.display = 'block';

                var donate = document.getElementsByClassName('donate')[0];
                donate.style.display = 'none';

            }

        }]
    }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// 右键菜单

const cMenu = remote.Menu;
const cMenuItem = remote.MenuItem;


const cmenu = new cMenu();

cmenu.append(new cMenuItem({
    label: '重新加载',
    accelerator: 'CmdOrCtrl+R',
    type: 'normal',
    click: function() {
        window.location.reload()
    }
}));
cmenu.append(new cMenuItem({
    label: '审查元素',
    type: 'normal',
    // accelerator: 'CmdOrCtrl+Shift+C',
    click: function(item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.inspectElement(electron.screen.getCursorScreenPoint().x - focusedWindow.getPosition()[0], electron.screen.getCursorScreenPoint().y - focusedWindow.getPosition()[1] - 100);
    }
}));

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    cmenu.popup(remote.getCurrentWindow());
}, false);



