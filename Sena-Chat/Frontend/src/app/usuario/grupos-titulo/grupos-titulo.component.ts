import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapService } from '../Servicios/bootstrap.service';

@Component({
  selector: 'app-grupos-titulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos-titulo.component.html',
  styleUrl: './grupos-titulo.component.css'
})
export class GruposTituloComponent {
  constructor (private B: BootstrapService) {}
  @Input() titulo: any;

  ngOnInit(){ }

  editarPerfil = () => this.B.editarCanva();
}
