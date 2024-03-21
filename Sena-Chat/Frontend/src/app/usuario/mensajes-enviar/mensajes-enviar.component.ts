import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SesionService } from '../Sesiones/sesion.service';
import { MensajeEmitir } from '../Modelos/mensaje';
import { MensajesImagenComponent } from '../mensajes-imagen/mensajes-imagen.component';
import { ChatService } from '../Servicios/chat.service';

@Component({
  selector: 'app-mensajes-enviar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MensajesImagenComponent],
  templateUrl: './mensajes-enviar.component.html',
  styleUrl: './mensajes-enviar.component.css'
})
export class MensajesEnviarComponent {
  constructor(
    protected Sesion: SesionService,
    private Chat: ChatService
  ) { }

  @ViewChild(FormGroupDirective)
  formDirective !: FormGroupDirective;
  @Output() emitir = new EventEmitter<MensajeEmitir>();
  form = new FormGroup({
    contenido_mensaje: new FormControl('', Validators.required),
    archivo: new FormControl('')
  });
  archivos: string[] = [];
  imagenes: Array<File> = [];
  noEnviar: boolean | undefined = true;
  offcanvasClass = '';

  longitud() {
    this.form.get('contenido_mensaje')?.value?.trim().length ?
    this.noEnviar = false : this.noEnviar = true;
  }

  emitirEnvio(formValue: any) {
    formValue.id_mensaje = undefined;
    if (formValue.archivo) {
      delete formValue.archivo;
      this.imagenes.forEach((element) => {
        const formData = new FormData();
        formData.append('file', element);
        formValue.id_tipo = '2';
        this.Chat.subirImagen(formData).subscribe(data => formValue.contenido_mensaje = data);
        this.emitir.emit(formValue);
      });
    } else {
      formValue.id_tipo = '1';
      delete formValue.archivo;
      this.emitir.emit(formValue);
    }
    this.cerrar();
  }

  obtenerArchivo(event: any) {
    for (const key in event.files) {
      if (key !== 'length' && key !== 'item') {
        this.convertFile(event.files[key]).then((image: any) => this.archivos.push(image));
        this.imagenes.push(event.files[key]);
      }
    }
  }

  convertFile = async (file: File) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { resolve(reader.result) };
    } catch (error) { console.error(error); }
  });

  cerrar() {
    this.archivos = [];
    this.form.reset();
  }
}
