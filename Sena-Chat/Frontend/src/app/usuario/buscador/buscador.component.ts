import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buscar } from '../Modelos/buscar';
import { FormsModule } from '@angular/forms';
import { ChatDirective } from '../Directivas/chat.directive';
import { Grupo } from '../Modelos/grupos';
import { GrupoComponent } from '../grupo/grupo.component';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatDirective, GrupoComponent],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  @Input() buscando: any;
  @Input() itemsDeBusqueda: any;
  @Output() buscar = new EventEmitter();
  coincidencias: Buscar = {
    resultados: true,
    Grupos: [],
    Privados: [],
    Mensajes: []
  };
  valorBuscar = '';
  changes = '0';

  busqueda() {
    this.coincidencias.Grupos = [];
    this.coincidencias.Privados = [];
    if (this.valorBuscar.trim() != '') {
      this.buscar.emit(true);
      Array.isArray(this.itemsDeBusqueda) ? this.enArray() : this.enObjeto();
      this.changes = ChatDirective.seleccionar(this.changes);
    } else this.buscar.emit(false);
  }

  enObjeto() {
    Object.keys(this.itemsDeBusqueda).forEach((key: any) => 
      this.itemsDeBusqueda[key].forEach( (data: Grupo) => {
        if(data.nom_grupos.includes(this.valorBuscar)) this.coincidencias[key].push(data)
      })
    );
  }

  enArray() {
    // Trabajar en el futuro
  }

  estadoBusqueda(){
    // EN EL FUTURO
  }

  seleccionarEnBuscador(){
    console.log('hi');
  }
}