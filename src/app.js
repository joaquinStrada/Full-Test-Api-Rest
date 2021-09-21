const { app } = require('electron');
const { controller: mainController } = require('./controllers/mainWindow.controller.js');
const { controller: connectController } = require('./controllers/connectWindow.controller.js');
const { controller: addApiController } = require('./controllers/addApiWindow.controller.js');
const { createConnection } = require('./lib/database.js');
createConnection();

// iniciamos electron-reload solo si no estamos en produccion
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {});
}

// iniciamos la aplicacion
app.on('ready', () => {
    mainController(app, templateMenu);
});

// generamos el menu
const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar Api',
                accelerator: process.platform == 'darwin' ? 'command+N' : 'Ctrl+N',
                click() {
                    addApiController(app);
                }
            },
            {
                label: 'Conectarse a la BD',
                click() {
                    connectController(app);
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

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