import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../../Servicios/mensajes.service';

@Component({
  selector: 'app-editar-mensaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-mensaje.component.html',
  styleUrl: './editar-mensaje.component.css'
})
export class EditarMensajeComponent {
  constructor(private servicio: MensajesService) { }
  @Input() id_mensaje: any;
  @Output() volver = new EventEmitter();
  mensaje: any;

  ngOnInit() {
    this.servicio.traerMensajePorId(this.id_mensaje).subscribe(data => {
      this.mensaje = data;
      // this.formGrupo.setValue({
      //   nom_grupos: this.grupo.nom_grupos as string,
      //   descripcion_grupos: this.grupo.descripcion_grupos as string,
      //   id_ficha: this.grupo.id_ficha as string
      // })
    });
    // this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    // this.editar(this.formGrupo.value);
  }

  editar(datos: any){
    this.servicio
  }
}
