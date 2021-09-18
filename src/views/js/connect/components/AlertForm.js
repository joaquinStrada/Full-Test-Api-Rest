export default class AlertForm {
    constructor() {
        this.alert = document.getElementById('alert-form');
    }

    show(color, message) {
        this.alert.innerHTML = message;

        const colorDifferente = color === 'red' ? 'green' : 'red';

        if (this.alert.classList.contains(colorDifferente)) {
            this.alert.classList.remove(colorDifferente);
        }

        if (!this.alert.classList.contains(color)) {
            this.alert.classList.add(color);
        }
    }

    hide() {
        if (this.alert.classList.contains('red')) {
            this.alert.classList.remove('red');
        }

        if (this.alert.classList.contains('green')) {
            this.alert.classList.remove('green');
        }
    }
}