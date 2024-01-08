import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VisPerfilService } from '../Servicios/vis-perfil.service';
import { Usuario } from '../Modelos/usuarios';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-vis-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vis-perfil.component.html',
  styleUrl: './vis-perfil.component.css'
})
export class VisPerfilComponent {
  constructor(
    private router: Router,
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

