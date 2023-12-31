import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grupo } from '../Modelos/grupos';
import { ChatService } from '../Servicios/chat.service';
import { SesionService } from '../Sesiones/sesion.service';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Buscar } from '../Modelos/buscar';
import { ChatDirective } from '../Directivas/chat.directive';
import { MensajeEnviar } from '../Modelos/mensaje';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ChatDirective],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  constructor(
    private Chat: ChatService,
    protected Sesion: SesionService
  ) { }
  myModal: Modal | undefined  = undefined;
  @ViewChild(FormGroupDirective) formDirective !: FormGroupDirective;
  @Input() grupos: Grupo[] = [];
  @Input() privados: Grupo[] = [];
  @Input() changesValue = '';
  @Input() selected: any = {};
  @Output() makeChange = new EventEmitter<string[]>();
  @Output() envioMultiple = new EventEmitter<MensajeEnviar>();
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  pestañas = {
    gruposVisible: () => this.Sesion.set('pestaña', 'grupos'),
    privadosVisible: () => this.Sesion.set('pestaña', 'privados'),
    cerrarVisible: () => this.Sesion.set('pestaña', 'cerrar'),
  }
  changes = '0';
  valorBuscar = '';
  coincidencias: Buscar = {
    resultados: true,
    Grupos: [],
    Privados: []
  };
  mensajes = new FormGroup({
    variasFichas: new FormControl('', Validators.required),
    mensajeFichas: new FormControl('', Validators.required)
  });
  inputSizes = ['mensajeFichas', 'mensajeFichas2', 'mensajeFichas3'];
  idInput = this.inputSizes[0];
  checked: string[] = [];

  ngOnInit(): void {
    this.myModal = new Modal(document.getElementById('staticBackdrop') as HTMLElement);
  }

  seleccionarEnGrupos = (id: any) => {
    this.Sesion.remove('grupos');
    this.makeChange.emit([ChatDirective.seleccionar(this.changesValue), id]);
  };

  mostrarGrupos = () => this.pestañas.gruposVisible;

  mostrarPrivados = () => this.pestañas.privadosVisible;

  cerrarSesion = () => this.Sesion.clear();

  abrir = () => this.myModal?.show();

  cerrar(){
    this.checked = []; 
    this.mensajes.reset();
    this.myModal?.hide();
  }

  busqueda(){
    this.coincidencias.Grupos = [];
    this.coincidencias.Privados = [];
    if (this.valorBuscar != '') {
      for (let i = 0; i < Math.max(this.grupos.length, this.privados.length); i++) {
        if (this.grupos[i].nom_grupos.includes(this.valorBuscar)) this.coincidencias.Grupos.push(this.grupos[i].nom_grupos);
        else this.coincidencias.resultados = false;
        if (this.privados[i].nom_grupos.includes(this.valorBuscar)) this.coincidencias.Privados.push(this.privados[i].nom_grupos);
        else this.coincidencias.resultados = ChatDirective.estadoBusqueda(false, this.coincidencias.resultados);
      }
      this.changes = ChatDirective.seleccionar(this.changes);
    }
  }
  emitirEnvios(formValue: any) {
    // if (formValue.variasFichas) this.checked.forEach(
    //   (value: any) => {
    //     this.envioMultiple.emit({
    //       id_mensaje: undefined,
    //       primer_nom: '',
    //       primer_apellido: '',
    //       fecha_hora: '',
    //       contenido_mensaje: formValue.mensajeFichas,
    //       fk_destino: value,
    //       numerodoc: '',
    //       id_tipo: '',
    //     });
    //     this.seleccionarEnGrupos(value);
    //   });
    //   this.mensajes.reset();
  }
  inputSize(e: any) {
    if (this.mensajes.value.mensajeFichas == '') this.idInput = this.inputSizes[0];
    else if(this.inputSizes.indexOf(this.idInput) == 0 && e.code == 'Delete') console.log('e verdad');
    // else if(this.inputSizes.indexOf(this.idInput) == 1) undefined
    else if(this.inputSizes.indexOf(this.idInput) == 2) undefined
    else if(e.target.scrollHeight >  e.target.offsetHeight) this.idInput = this.inputSizes[this.inputSizes.indexOf(this.idInput) + 1];
  }
  check(selected: any) {
    if(this.checked.indexOf(selected.value) == -1 && selected.checked) this.checked.push(selected.value);
    else this.checked.splice(this.checked.indexOf(selected.value), 1);
  }
}
