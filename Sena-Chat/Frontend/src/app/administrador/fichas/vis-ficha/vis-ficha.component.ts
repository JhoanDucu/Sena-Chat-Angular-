import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichasService } from '../../Servicios/fichas.service';
import { Ficha } from '../../../Modelos/fichas';
import { BootstrapService } from '../../Servicios/bootstrap.service';

@Component({
  selector: 'app-vis-ficha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vis-ficha.component.html',
  styleUrl: './vis-ficha.component.css'
})
export class VisFichaComponent {
  constructor(private servicio: FichasService, private b: BootstrapService){ }
  @Output() mostrar = new EventEmitter();
  fichas: Ficha[] = [];

  ngOnInit(){
    this.servicio.traerFichas().subscribe((data: any) => this.fichas = data);
  }

  abrirInfo = () => this.b.infoMensajes();

}
