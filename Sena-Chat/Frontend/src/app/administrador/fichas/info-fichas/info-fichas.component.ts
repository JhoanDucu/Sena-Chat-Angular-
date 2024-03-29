import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ficha } from '../../../Modelos/fichas';
import { Grupo } from '../../../Modelos/grupos';
import { urlImagenes } from '../../../../servidor';
import { FichasService } from '../../Servicios/fichas.service';

@Component({
  selector: 'app-info-fichas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-fichas.component.html',
  styleUrl: './info-fichas.component.css'
})
export class InfoFichasComponent {
  constructor (private servicio: FichasService) {}
  @Input() ficha: Partial<Ficha> = {};
  url = urlImagenes;
  grupos: Grupo[] = [];
  aviso: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ficha'] && !changes['ficha'].firstChange)
      this.servicio.traerGrupos(this.ficha.id_ficha).subscribe((data: any) => {
        if (data !== 'No hay grupos aun') this.grupos = data;
        else {
          this.aviso = data;
          this.grupos = [];
        }
      });
  }
}