export default class Inputs {
    constructor() {
        this.inputs = {
            name: document.getElementById('input-name'),
            description: document.getElementById('input-description')
        };

        this.errorInputs = {
            name: true,
            description: true
        };

        this.expressions = {
            name: new RegExp('^.{4,50}$'),
            description: new RegExp('^.{4,400}$')
        };
    }

    inputValid(name, callback) {
        if (this.expressions[name].test(this.inputs[name].value)) {
            this.errorInputs[name] = false;
            callback(false, name);
        } else {
            this.errorInputs[name] = true;
            callback(true, name);  
        }
    }
    
    onInputValid(name, callback) {
        this.inputs[name].addEventListener('keyup', () => this.inputValid(name, callback));
        this.inputs[name].addEventListener('blur', () => this.inputValid(name, callback));
    }

    isValid() {
        let encontrado = false;

        for (const input in this.errorInputs) {
            if (this.errorInputs[input]) {
                encontrado = true;
                return false;
            }
        }

        return !encontrado;
    }

    resetInputs() {
        for (const input in this.errorInputs) {
            this.errorInputs[input] = true;
        }
    }
}