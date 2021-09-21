export default class Model {
    constructor() {
        this.view = null;

        this.ipcRenderer = require('electron').ipcRenderer;
    }

    setView(view) {
        this.view = view;
    }

    setEvents() {
        this.ipcRenderer.on('message', (e, data) => {
            const { error, message } = data;
            this.view.onMessage(error, message);
        });

        this.ipcRenderer.on('savedApi', () => this.view.onSavedApi());
    }

    saveApi(data) {
        this.ipcRenderer.send('saveApi', data);
    }
}