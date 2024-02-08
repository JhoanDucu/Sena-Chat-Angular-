import { Injectable } from '@angular/core';
import { Dropdown, Modal, Offcanvas, Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  private gruposModal: any;
  private editarOffcanvas: any;
  private infoPerfilOffcanvas: any;
  private infoGruposOffCanvas: any;
  private infoAgregarOffCanvas: any;
  private toastEl: any;
  private infoDropdown: any;

  constructor() { }

  iniciarInstanciasChat() {
    this.gruposModal = new Modal(document.getElementById('staticBackdrop') as HTMLElement);
    this.editarOffcanvas = new Offcanvas(document.getElementById('offcanvasRight') as HTMLElement);
    this.toastEl = new Toast(document.getElementById('liveToast') as HTMLElement);
  }

  iniciarInstanciasInfo(){
    this.infoGruposOffCanvas = new Offcanvas(document.getElementById('offcanvasNavbar') as HTMLElement);
    this.infoAgregarOffCanvas = new Offcanvas(document.getElementById('offcanvasRight2') as HTMLElement);
    this.infoPerfilOffcanvas = new Offcanvas(document.getElementById('offcanvasRight3') as HTMLElement);
  }

  modal = () => this.gruposModal.toggle();

  editarCanva = () => this.editarOffcanvas.toggle();

  perfilCanva = () => this.infoPerfilOffcanvas.toggle();

  infoCanva = () => this.infoGruposOffCanvas.toggle();

  agregarCanva = () => this.infoAgregarOffCanvas.toggle();

  toast = () => this.toastEl.show();

  drop = () => {
    this.infoDropdown = new Dropdown(document.getElementById('dropdown') as HTMLElement);
    this.infoDropdown.show();
  }
}
