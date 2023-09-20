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
  numerodoc = '';

  // usuario = {
  //   primerNombre: 'Juan',
  //   segundoNombre: 'David',
  //   primerApellido: 'Cardenas',
  //   segundoApellido: 'Perez',
  //   nombreUsuario: 'juan_cardenas',
  //   numeroDocumento: '1131104356',
  //   correoElectronico: 'juan.cardenas34@misena.edu.co',
  // };

  ngOnInit(): void { 
    this.VisPerfilService.buscarDatos(this.rutaActiva.snapshot.params['documento']).subscribe((data:any)=> data.forEach((value: any)=> this.item.push(value)));
  }

  
}
