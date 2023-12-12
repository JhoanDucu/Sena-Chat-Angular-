import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogearService } from '../Servicios/logear.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  constructor( 
    private loginServicio: LogearService,
    private Sesion: SesionService,
    private router: Router
    ){}
    formBienv = new FormGroup({
      ficha: new FormControl('')
    });
  setFicha( ficha: any){
    this.loginServicio.seleccionarFicha({buscar: ficha}, this.Sesion.get('documento')).subscribe((respuesta: any) => {
      if(respuesta.length === 2) {
        this.Sesion.set('ficha', respuesta[0]);
        this.router.navigate(['chat']);
      };
    });
  }
}
