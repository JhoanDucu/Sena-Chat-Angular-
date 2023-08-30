import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogearService } from '../Servicios/logear.service';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
  constructor( 
    private loginServicio: LogearService,
    private rutaActiva: ActivatedRoute 
    ){}
  setFicha( ficha: ''){
    this.loginServicio.seleccionarFicha({buscar: ficha}, this.rutaActiva.snapshot.params['usuario']).subscribe((respuesta: any) => {
      alert(respuesta);
    });
  }
}
