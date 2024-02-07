import { Modal } from "bootstrap";

export class Modals {
    private GruposModal: Modal;
    constructor () {
        this.GruposModal = new Modal(document.getElementById('staticBackdrop') as HTMLElement);
    }

    usar (which: string, action: number){
        if (which === 'grupos') {
            if (action === 1) this.GruposModal.show();
            if (action === 2) this.GruposModal.hide();
        }
    }
};