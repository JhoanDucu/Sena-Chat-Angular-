import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SesionService } from '../Sesiones/sesion.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mensajes-enviar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mensajes-enviar.component.html',
  styleUrl: './mensajes-enviar.component.css'
})
export class MensajesEnviarComponent {
  constructor (
    protected Sesion: SesionService,
    private sanitizer: DomSanitizer
  ) {}
  
  @ViewChild(FormGroupDirective)
  formDirective !: FormGroupDirective;
  @Output() emitir = new EventEmitter<Object>();
  form = new FormGroup({
    contenido_mensaje: new FormControl('', Validators.required)
  });
  archivos = [];
  archivo = undefined;
  noEnviar = true;

  longitud(){
    if(this.form.get('contenido_mensaje')?.errors?.['required']){
      this.noEnviar = true;
    } else {
      this.noEnviar = false;
    }
  }

  emitirEnvio(formValue: any){
    this.emitir.emit(formValue);
    this.form.reset()
  }

  obtenerArchivo(event: any){
    this.convertFile(event.files[0]).then((image: any) => this.archivo = image);
  }

  convertFile = async (file : File) => new Promise((resolve, reject) => {
    try {
      // const insegura = window.URL.createObjectURL(file);
    // const segura = this.sanitizer.bypassSecurityTrustUrl(insegura);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {resolve(reader.result)};
    } catch (error) {
      
    }
  });
}
