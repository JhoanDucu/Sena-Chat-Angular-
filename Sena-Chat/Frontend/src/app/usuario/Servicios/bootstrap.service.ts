import { Injectable } from '@angular/core';
import { Modal, Offcanvas, Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  private gruposModal: any;
  private editarOffcanvas: any;
  private toastEl: any;

  constructor() { }

  iniciarInstancias() {
    this.gruposModal = new Modal(document.getElementById('staticBackdrop') as HTMLElement);
    this.editarOffcanvas = new Offcanvas(document.getElementById('offcanvasRight') as HTMLElement);
    this.toastEl = new Toast(document.getElementById('liveToast') as HTMLElement);
  }

  modal = (visible: boolean) => visible ? this.gruposModal.show() : this.gruposModal.hide();

  editarCanva = (visible: boolean) => visible ? this.editarOffcanvas.show() : this.editarOffcanvas.hide();

  toast = () => this.toastEl.show();

}
