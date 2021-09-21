const { BrowserWindow, ipcMain, Menu } = require('electron');
const url = require('url');
const { join } = require('path');
const { getConnection } = require('../lib/database.js');

let window;

const controller = (app) => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    window.loadURL(url.format({
        pathname: join(__dirname, '..', 'views', 'addApi.html'),
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

ipcMain.on('saveApi', async (e, data) => {
    const conn = getConnection();

    if (conn.error) {
        sendMessage('message', {
            error: true,
            message: 'Aún no se ha establecido una conexión con la BD'
        });
        return;
    }

    try {
        const [ row ] = await conn.conn.query('SELECT COUNT(*) FROM apis WHERE `nombre` = ?', [data.nombre]);
        
        if (row[0]['COUNT(*)'] > 0) {
            sendMessage('message', {
                error: true,
                message: 'Ya agregaste una api con ese nombre'
            });
            return; 
        }

        await conn.conn.query('INSERT INTO apis SET ?', [data]);

        sendMessage('savedApi', {});
    } catch (err) {
        console.error(err);
        sendMessage('message', {
            error: true,
            message: 'Se ha producido un error al intentar guardar la api'
        });
    }
});

const sendMessage = (channel, data) => {
    window.webContents.send(channel, data);
}

module.exports = {
    controller
};