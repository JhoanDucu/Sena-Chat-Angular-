import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisGruposComponent } from '../grupos/vis-grupos/vis-grupos.component';
import { VisUsuarioComponent } from '../usuarios/vis-usuario/vis-usuario.component';
import { VisMensajeComponent } from '../mensajes/vis-mensaje/vis-mensaje.component';
import { VisFichaComponent } from '../fichas/vis-ficha/vis-ficha.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    VisGruposComponent,
    VisUsuarioComponent,
    VisMensajeComponent,
    VisFichaComponent
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() {
    this.message = '';
  }

  opcion: string = 'grupos';

  message!: string;

  ngOnInit() { }

  seleccionarOpcion = (opcion: string) => this.opcion = opcion;

}
