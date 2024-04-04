import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() confirmar: any;
  fichas: Ficha[] = [];
  idBorrar: any;
  index: any;

  ngOnInit(){
    this.servicio.traerFichas().subscribe((data: any) => this.fichas = data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['confirmar'].firstChange) 
    this.servicio.eliminarFicha(this.idBorrar).subscribe((data) => {
      if(data === 'Ficha eliminada correctamente') this.fichas.splice(this.index, 1);
      this.abrirModal();
    });
  }

  abrirInfo = (ficha: Ficha) => {
    this.b.infoFichas();
    this.mostrar.emit(['fichas', undefined, ficha]);
  };

  abrirModal(id?: any, index?: any){
    this.idBorrar = id ? id : undefined;
    this.index = index ? index : undefined;
    this.b.modal();
  }

}