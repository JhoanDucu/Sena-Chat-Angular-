import { Component } from '@angular/core';
import { VisPerfilService } from '../Servicios/vis-perfil.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { Usuario } from '../modelos/usuarios';

@Component({
  selector: 'app-vis-perfil',
  templateUrl: './vis-perfil.component.html',
  styleUrls: ['./vis-perfil.component.css']
})
export class VisPerfilComponent {
  constructor(
    private router: Router,
    private VisPerfilService: VisPerfilService,
    private rutaActiva: ActivatedRoute
    ){}

  public item: Usuario[] = [];
  numerodoc = this.rutaActiva.snapshot.params['documento'];
  ficha = this.rutaActiva.snapshot.params['ficha'];
  ngOnInit(): void { 
    this.VisPerfilService.buscarDatos(this.numerodoc).subscribe((data:any)=> data.forEach((value: any)=> this.item.push(value)));
  }
}
