const { BrowserWindow, ipcMain, Menu } = require('electron');
const url = require('url');
const { join } = require('path');

let window;

const controller = (app, templateMenu) => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    window.loadURL(url.format({
        pathname: join(__dirname, '..', 'views', 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    window.setMenu(mainMenu);

    window.on('closed', () => {
        app.quit();
    });
}

module.exports = {
    controller
};