import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VisPerfilService } from '../Servicios/vis-perfil.service';
import { Usuario } from '../Modelos/usuarios';

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
    private rutaActiva: ActivatedRoute
    ){}

  public item: Usuario = new Usuario('','','','','','','','','','','','');
  numerodoc = this.rutaActiva.snapshot.params['documento'];
  ficha = this.rutaActiva.snapshot.params['ficha'];
  ngOnInit(): void { 
    this.VisPerfilService.buscarDatos(this.numerodoc).subscribe((data:any) => this.item = data[0]);
  }
}

