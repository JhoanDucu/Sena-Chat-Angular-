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
  setFicha( ficha: {Ficha: ''}){
    let usuario = this.rutaActiva.snapshot.params;
    let UsuarioFicha = { f: ficha.Ficha, u: usuario['usuario']}
    this.loginServicio.seleccionarFicha(UsuarioFicha).subscribe((respuesta: any) => {
      if (respuesta==true) {
        alert('sip');
      }
      // prompt("Su ficha es "+respuesta['ficha']);
    });
  }
}
