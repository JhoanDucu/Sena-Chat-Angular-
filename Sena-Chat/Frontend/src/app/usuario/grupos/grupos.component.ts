import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoComponentData, Tabs } from '../Modelos/grupos';
import { SesionService } from '../Sesiones/sesion.service';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatDirective } from '../Directivas/chat.directive';
import { MensajeEnviar } from '../Modelos/mensaje';
import { Modal } from 'bootstrap';
import { SocketService } from '../Servicios/socket.service';
import { GrupoComponent } from '../grupo/grupo.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { MiPerfilComponent } from '../mi-perfil/mi-perfil.component';
import { GruposTituloComponent } from '../grupos-titulo/grupos-titulo.component';
import { Router } from '@angular/router';
import { GruposPanelComponent } from '../grupos-panel/grupos-panel.component';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChatDirective,
    GrupoComponent,
    BuscadorComponent,
    MiPerfilComponent,
    GruposTituloComponent,
    GruposPanelComponent
  ],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  constructor(
    protected Sesion: SesionService,
    private router: Router,
    private socket: SocketService
  ) { }
  myModal: Modal | undefined = undefined;
  @ViewChild(FormGroupDirective) formDirective !: FormGroupDirective;
  @Input() datos: GrupoComponentData = {grupos: [], privados: []};
  @Input() usuario: any;
  @Input() changesValue = '';
  @Input() selected: any = {};
  @Output() makeChange = new EventEmitter<any[]>();
  @Output() envioMultiple = new EventEmitter<MensajeEnviar>();
  @Output() deseleccionar = new EventEmitter();
  tabs: Tabs = {
    grupos: { class: 'tab-pane fade show active', new: false },
    privados: { class: 'tab-pane fade', new: false },
    ajustes: { class: 'tab-pane fade', new: false },
    perfil: { class: 'tab-pane fade', new: false },
  }
  mensajes = new FormGroup({
    variasFichas: new FormControl('', Validators.required),
    mensajeFichas: new FormControl('', Validators.required),
  });
  inputSizes = ['mensajeFichas', 'mensajeFichas2', 'mensajeFichas3'];
  idInput = this.inputSizes[0];
  checked: string[] = [];
  enBusqueda = false;

  ngOnInit(): void {
    this.myModal = new Modal(document.getElementById('staticBackdrop') as HTMLElement);
  }

  seleccionarEnGrupos = (id: any, index: number, type: string) => {
    if (this.Sesion.get('grupos')) this.socket.gestionarSalas({ accion: 'salirSala', id_grupo: this.Sesion.get('grupos') });
    this.makeChange.emit([ChatDirective.seleccionar(this.changesValue), String(id), index, type]);
    this.socket.gestionarSalas({ accion: 'unirSala', id_grupo: String(id) });
  };

  showTab = (tab: string) => {
    this.Sesion.set('pestaña', tab);
    for (const key in this.tabs) 
    key == tab ? this.tabs[key].class = 'tab-pane fade show active' : this.tabs[key].class = 'tab-pane fade';
  };

  mostrarBusqueda = (value: boolean) => this.enBusqueda = value;

  abrir = () => this.myModal?.show();

  cerrar() {
    this.checked = [];
    this.mensajes.reset();
    this.myModal?.hide();
  }

  emitirEnvios(formValue: any) {
    if (formValue.variasFichas) this.checked.forEach(
      (value, index) => {
        this.seleccionarEnGrupos(value, index, 'grupos');
        this.envioMultiple.emit({
          id_mensaje: undefined,
          fecha_hora: '',
          contenido_mensaje: formValue.mensajeFichas,
          fk_destino: value,
          id_tipo: '1'
        });
        this.deseleccionar.emit();
      });
    this.cerrar();
  }

  inputSize(e: any) {
    if (this.mensajes.value.mensajeFichas == '') this.idInput = this.inputSizes[0];
    else if (this.inputSizes.indexOf(this.idInput) == 0 && e.code == 'Delete') console.log('e verdad');
    // else if(this.inputSizes.indexOf(this.idInput) == 1) undefined
    else if (this.inputSizes.indexOf(this.idInput) == 2) undefined
    else if (e.target.scrollHeight > e.target.offsetHeight) this.idInput = this.inputSizes[this.inputSizes.indexOf(this.idInput) + 1];
  }

  check(selected: any) {
    if (this.checked.indexOf(selected.value) == -1 && selected.checked) this.checked.push(selected.value);
    else this.checked.splice(this.checked.indexOf(selected.value), 1);
  }

  cambiarPosicion(index: any, objeto: any, opcion: number) {
    let tempObjeto = objeto;
    if (opcion != 2) {
      this.datos.grupos.splice(index, 1);
      this.datos.grupos.unshift(tempObjeto);
    } else {
      this.datos.privados.splice(index, 1);
      this.datos.privados.unshift(tempObjeto);
    }
  }

  tiene = (g: any, propiedad: string) => ChatDirective.contieneMensajes(g, propiedad);
}
