import { Component, OnInit } from '@angular/core';
import { CrearGrupoService } from '../service/crear-grupo.service'; // Asegúrate de que la ruta es correcta
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';
import { VisGruposComponent } from '../vis-grupos/vis-grupos/vis-grupos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, CrearGrupoComponent, VisGruposComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

message!: string;

  constructor(private crearGrupoService: CrearGrupoService) {
    this.message = '';
  }
  ngOnInit() {
    this.crearGrupoService.currentMessage.subscribe((message: string) => this.message = message)
  }

}
