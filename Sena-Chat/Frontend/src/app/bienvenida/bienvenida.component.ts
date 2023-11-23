import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogearService } from '../Servicios/logear.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    private rutaActiva: ActivatedRoute,
    private router: Router
    ){}
    formBienv = new FormGroup({
      ficha: new FormControl('')
    });
  setFicha( ficha: any){
    this.loginServicio.seleccionarFicha({buscar: ficha}, this.rutaActiva.snapshot.params['usuario']).subscribe((respuesta: any) => {
      if(respuesta.length === 2) this.router.navigate(['chat', respuesta[1], respuesta[0],'']);
    });
  }
}
