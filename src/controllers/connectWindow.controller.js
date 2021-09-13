const { BrowserWindow, ipcMain, Menu } = require('electron');
const url = require('url');
const { join } = require('path');

let window;

const controller = (app) => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    window.loadURL(url.format({
        pathname: join(__dirname, '..', 'views', 'connect.html'),
        protocol: 'file',
        slashes: true
    }));

    const templateMenu = [];

    // lo hacemos compatible para ios
    if (process.platform == 'darwin') {
        templateMenu.unshift({
            label: app.getName()
        });
    }

    // mostramos las herramientas de desarrollo solo si lo estamos
    if (process.NODE_ENV !== 'production') {
        templateMenu.push({
            label: 'Dev-Tools',
            submenu: [
                {
                    label: 'show/hide dev tools',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        });
    }

    const connectMenu = Menu.buildFromTemplate(templateMenu);
    window.setMenu(connectMenu);
};

module.exports = {
    controller,
}