export default class AlertInput {
    constructor(id) {
        this.alert = document.getElementById(id)
    }

    show() {
        if (!this.alert.classList.contains('active')) {
           this.alert.classList.add('active'); 
        }
    }

    hide() {
        if (this.alert.classList.contains('active')) {
            this.alert.classList.remove('active');
        }
    }
}