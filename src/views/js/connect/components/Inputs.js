export default class Inputs {
    constructor() {
        this.inputs = {
            host: document.getElementById('input-host'),
            port: document.getElementById('input-port'),
            user: document.getElementById('input-user'),
            pass: document.getElementById('input-pass'),
            database: document.getElementById('input-database')
        }

        this.errorInputs = {
            host: true,
            port: true,
            user: true,
            pass: true,
            database: true
        }

        this.expressions = {
            host: new RegExp('\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?(\.|$)){4}\\b'),
            port: new RegExp('^\\d{1,5}$'),
            user: new RegExp('^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$'),
            pass: new RegExp('^.{4,20}$'),
            database: new RegExp('^.{4,20}$')
        };
    }

    inputValid(name, callback) {
        switch (name) {
            case "host":
                if (this.inputs[name].value === 'localhost' || this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                    callback(false, name);
                } else {
                    this.errorInputs[name] = true;
                    callback(true, name);
                }
                break;

            case "port":
                if (this.expressions[name].test(this.inputs[name].value) && parseInt(this.inputs[name].value) >= 0 && parseInt(this.inputs[name].value) <= 65535) {
                    this.errorInputs[name] = false;
                    callback(false, name);
                } else {
                    this.errorInputs[name] = true;
                    callback(true, name);
                }
                break;

            case "user":
                if (this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                    callback(false, name);
                } else {
                    this.errorInputs[name] = true;
                    callback(true, name);
                }
                break;
            case "pass":
                if (this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                    callback(false, name);
                } else {
                    this.errorInputs[name] = true;
                    callback(true, name);
                }
                break;

            case "database":
                if (this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                    callback(false, name);
                } else {
                    this.errorInputs[name] = true;
                    callback(true, name);
                }
                break;


            default:
                break;
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

    renderValidate(name) {
        switch (name) {
            case "host":
                if (this.inputs[name].value === 'localhost' || this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                } else {
                    this.errorInputs[name] = true;
                }
                break;

            case "port":
                if (this.expressions[name].test(this.inputs[name].value) && parseInt(this.inputs[name].value) >= 0 && parseInt(this.inputs[name].value) <= 65535) {
                    this.errorInputs[name] = false;
                } else {
                    this.errorInputs[name] = true;
                }
                break;

            case "user":
                if (this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                } else {
                    this.errorInputs[name] = true;
                }
                break;
            case "pass":
                if (this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                } else {
                    this.errorInputs[name] = true;
                }
                break;

            case "database":
                if (this.expressions[name].test(this.inputs[name].value)) {
                    this.errorInputs[name] = false;
                } else {
                    this.errorInputs[name] = true;
                }
                break;


            default:
                break;
        }
    }
}