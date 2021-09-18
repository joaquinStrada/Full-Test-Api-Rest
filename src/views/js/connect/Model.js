export default class Model {
    constructor() {
        this.view = null;

        this.ipcRenderer = require('electron').ipcRenderer;
    }

    setView(view) {
        this.view = view;
    }

    saveData(data) {
        this.ipcRenderer.send('saveData', data);
    }

    render() {
        this.ipcRenderer.send('getData', {});
        this.setEvents();
    }

    setEvents() {
        this.ipcRenderer.on('message', (e, data) => {
            const { error, message } = data;
            this.view.onMessage(error, message);
        });

        this.ipcRenderer.on('responseData', (e, data) => {
            this.view.setData(data);
        });
    }

    testDB() {
        this.ipcRenderer.send('testDB', {});
    }

    cancel() {
        this.ipcRenderer.send('cancelWindow', {}); 
    }
}