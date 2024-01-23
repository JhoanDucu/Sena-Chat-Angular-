import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grupo } from '../Modelos/grupos';
import { SesionService } from '../Sesiones/sesion.service';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatDirective } from '../Directivas/chat.directive';
import { MensajeEnviar } from '../Modelos/mensaje';
import { Modal } from 'bootstrap';
import { SocketService } from '../Servicios/socket.service';
import { GrupoComponent } from '../grupo/grupo.component';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ChatDirective, GrupoComponent, BuscadorComponent],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  constructor(
    protected Sesion: SesionService,
    private socket: SocketService
  ) { }
  myModal: Modal | undefined = undefined;
  @ViewChild(FormGroupDirective) formDirective !: FormGroupDirective;
  @Input() grupos: Grupo[] = [];
  @Input() privados: Grupo[] = [];
  @Input() changesValue = '';
  @Input() selected: any = {};
  @Output() makeChange = new EventEmitter<any[]>();
  @Output() envioMultiple = new EventEmitter<MensajeEnviar>();
  @Output() deseleccionar = new EventEmitter();
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  pestañas = { 
    gruposVisible: () => this.Sesion.set('pestaña', 'grupos'),
    privadosVisible: () => this.Sesion.set('pestaña', 'privados'),
    cerrarVisible: () => this.Sesion.set('pestaña', 'cerrar'),
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

  mostrarGrupos = () => this.pestañas.gruposVisible();

  mostrarPrivados = () => this.pestañas.privadosVisible();

  mostrarBusqueda = (value: boolean) =>   this.enBusqueda = value;

  cerrarSesion = () => this.Sesion.clear();

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

  cambiarPosicion(index: any, objeto: any, opcion: number){
    let tempObjeto = objeto;
    if (opcion != 2) {
      this.grupos.splice(index, 1);
      this.grupos.unshift(tempObjeto);
    } else {
      this.privados.splice(index, 1);
      this.privados.unshift(tempObjeto);
    }
  }
}
