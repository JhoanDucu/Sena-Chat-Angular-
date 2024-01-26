import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisPerfilService } from '../Servicios/vis-perfil.service';
import { SesionService } from '../Sesiones/sesion.service';
import { Usuario } from '../Modelos/usuarios';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  constructor(
    private VisPerfilService: VisPerfilService,
    private Sesion: SesionService
  ) { }

  public item: Usuario = new Usuario('', '', '', '', '', '', '', '', '', '', '', '');
  numerodoc = this.Sesion.get('documento');
  ficha = this.Sesion.get('ficha');
  ngOnInit(): void {
    this.VisPerfilService.buscarDatos(this.numerodoc).subscribe((data: any) => this.item = data[0]);
  }
}
