import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-grupos-titulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos-titulo.component.html',
  styleUrl: './grupos-titulo.component.css'
})
export class GruposTituloComponent {
  @Input() titulo: any;
  editar: Offcanvas | undefined;

  ngOnInit(){
    this.editar = new Offcanvas(document.getElementById('offcanvasRight') as HTMLElement);
  }

  editarPerfil = () => this.editar?.show();
}
