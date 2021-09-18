const { BrowserWindow, ipcMain, Menu } = require('electron');
const url = require('url');
const { join } = require('path');
const { readConfig, saveConfig } = require('../lib/config.js');
const { createConnection, getConnection } = require('../lib/database.js');

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

ipcMain.on('saveData', async (e, data) => {
    try {
        saveConfig(data);
        await createConnection();
        sendMessage('message', {
            error: false,
            message: 'Datos Guardados Satisfactoriamente'
        });
    } catch (err) {
        console.error(err);
        sendMessage('message', {
            error: true,
            message: 'No nos pudimos conectar a la Base de Datos'
        });
    }
});

ipcMain.on('testDB', () => {
    const conn = getConnection();
    if (!conn.error) {
        sendMessage('message', {
            error: false,
            message: 'Base de datos conectada satisfactoriamente'
        });
    } else {
        sendMessage('message', {
            error: true,
            message: `Ocurrio un error al intentar conectarnos a la base de datos: ${conn.message}`
        });
    }
});

ipcMain.on('getData', () => {
    const config = readConfig();
    sendMessage('responseData', config);
});

ipcMain.on('cancelWindow', () => {
    window.close();
});

const sendMessage = (channel, data) => {
    window.webContents.send(channel, data);
}

module.exports = {
    controller,
}