import Inputs from './components/Inputs.js';
import AlertInput from './components/AlertInput.js';
import AlertForm from './components/AlertForm.js';

export default class View {
    constructor() {
        this.model = null;

        this.form = document.getElementById('form-add');

        this.inputs = new Inputs();

        this.alerts = {
            name: new AlertInput('alert-name'),
            description: new AlertInput('alert-description')
        };

        this.alertForm = new AlertForm();

        this.form.addEventListener('submit', e => this.onSubmit(e));
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const inputs = ['name', 'description'];

        inputs.forEach(input => {
            this.inputs.onInputValid(input, (err, name) => this.onInputError(err, name));
        });

        this.form.reset();
    }

    onMessage(err, message) {
        if (err) {
            this.alertForm.show('red', message);
        } else {
            this.alertForm.show('green', message);
        }
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

        const saveApi = {
            nombre: data.get('name'),
            descripcion: data.get('description')
        };

        this.model.saveApi(saveApi);
    }

    onSavedApi() {
        this.alertForm.show('green', 'Api guardada satisfactoriamente');
        this.inputs.resetInputs();
        this.form.reset();
    }
}