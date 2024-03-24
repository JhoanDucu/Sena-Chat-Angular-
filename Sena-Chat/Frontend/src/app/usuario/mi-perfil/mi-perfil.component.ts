import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../Modelos/usuarios';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  constructor(private sesion: SesionService) { }
  @Input() perfil: any;

  ngOnInit(): void { }

  rol = () => this.sesion.get('rol') == '1' ? true : false;
}
