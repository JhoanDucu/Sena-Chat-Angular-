import { Injectable } from '@angular/core';
import { Dropdown, Modal, Offcanvas, Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  private gruposModal: any;
  private infoGruposOffcanvas: any;
  private infoUsuariosOffCanvas: any;
  private infoMensajesOffcanvas: any;
  private infoFichasOffCanvas: any;
  private infoGruposDropdown: any;
  // private infoAgregarOffCanvas: any;
  // private toastEl: any;
  // private toastPerfilEditar: any;

  constructor() { }

  iniciarInstanciasAdmin() {
    this.infoGruposOffcanvas = new Offcanvas(document.getElementById('grupos') as HTMLElement);
    this.infoUsuariosOffCanvas = new Offcanvas(document.getElementById('usuarios') as HTMLElement);
    this.infoMensajesOffcanvas = new Offcanvas(document.getElementById('mensajes') as HTMLElement);
    this.infoFichasOffCanvas = new Offcanvas(document.getElementById('fichas') as HTMLElement);
  }

  iniciarInstanciasInfo() {
    this.gruposModal = new Modal(document.getElementById('staticBackdrop') as HTMLElement);
    // this.toastEl = new Toast(document.getElementById('liveToast') as HTMLElement);
    // this.toastPerfilEditar = new Toast(document.getElementById('actualizado') as HTMLElement);
    // this.infoAgregarOffCanvas = new Offcanvas(document.getElementById('offcanvasRight2') as HTMLElement);
  }

  modal = () => this.gruposModal.toggle();

  infoGrupos = () => this.infoGruposOffcanvas.toggle();

  infoUsuarios = () => this.infoUsuariosOffCanvas.toggle();

  infoMensajes = () => this.infoMensajesOffcanvas.toggle();

  infoFichas = () => this.infoFichasOffCanvas.toggle();

  // infoCanvaCerrar = () => this.infoGruposOffCanvas.hide();

  // agregarCanva = () => this.infoAgregarOffCanvas.toggle();

  // toast = () => this.toastEl.show();

  // toastPerfil = () => this.toastPerfilEditar.show();

  drop = (id: string) => {
    this.infoGruposDropdown = new Dropdown(document.getElementById(id) as HTMLElement);
    this.infoGruposDropdown.show();
  }
}
