import Inputs from './components/Inputs.js';
import AlertInput from './components/AlertInput.js';
import AlertForm from './components/AlertForm.js';

export default class view {
    constructor() {
        this.model = null;

        this.form = document.getElementById('form-connect');
        this.input = {
            host: document.getElementById('input-host'),
            port: document.getElementById('input-port'),
            user: document.getElementById('input-user'),
            pass: document.getElementById('input-pass'),
            database: document.getElementById('input-database')
        }
        this.alerts = {
            host: new AlertInput('alert-host'),
            port: new AlertInput('alert-port'),
            user: new AlertInput('alert-user'),
            pass: new AlertInput('alert-pass'),
            database: new AlertInput('alert-database')
        }
        this.btnTest = document.getElementById('btn-test');
        this.btnCancel = document.getElementById('btn-cancel');

        this.inputs = new Inputs();

        this.alertForm = new AlertForm();

        this.form.addEventListener('submit', e => this.onSubmit(e));
        this.btnTest.addEventListener('click', () => this.onTest());
        this.btnCancel.addEventListener('click', () => this.onCancel());
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const inputs = ['host', 'port', 'user', 'pass', 'database'];

        inputs.forEach(input => {
            this.inputs.onInputValid(input, (err, name) => this.onInputError(err, name));
        })
    }

    onInputError(err, name) {
        if (err) {
            this.alerts[name].show();
        } else {
            this.alerts[name].hide();
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.inputs.isValid()) {
            this.alertForm.show('red', 'Porfavor rellene correctamente el formulario');
            return;
        } else {
            this.alertForm.hide();
        }
        
        const data = new FormData(this.form);

        const saveData = {
            host: data.get('host'),
            port: data.get('port'),
            user: data.get('user'),
            password: data.get('pass'),
            database: data.get('database')
        };

        this.model.saveData(saveData);
    }

    onMessage(err, message) {
        if (err) {
            this.alertForm.show('red', message);
        } else {
            this.alertForm.show('green', message);
        }
    }

    onTest() {
        this.model.testDB();
    }

    onCancel() {
        this.model.cancel();
    }

    setData(data) {
        for (const input in data) {
            if (input !== 'password') {
                this.input[input].value = data[input];
                this.inputs.renderValidate(input);
            }
        }
    }
}