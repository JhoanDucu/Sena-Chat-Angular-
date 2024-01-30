<<<<<<< Updated upstream
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
=======
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../Modelos/usuarios';
>>>>>>> Stashed changes

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
<<<<<<< Updated upstream

=======
  @Input() usuario: Usuario = {}
>>>>>>> Stashed changes
}
