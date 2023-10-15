import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(
    private router: Router,
    private Chat: ChatService,
    private rutaActiva: ActivatedRoute
    ){}
    grupos: Object[] = [];
  // grupos: Grupo[] = [];
  // mensaje: Mensaje[] = [];
  grupoSeleccionado = this.rutaActiva.snapshot.params['grupo'];
  fichaSeleccionada = this.rutaActiva.snapshot.params['ficha'];
  usuario = this.rutaActiva.snapshot.params['documento'];


  ngOnInit(): void {
    let ficha = this.rutaActiva.snapshot.params['ficha'];
    this.Chat.traerGrupos(ficha).subscribe((data: any)=> data.forEach((element: any) => {this.grupos.push(element)}));
  }

 gruposVisible = true;
 privadosVisible = false;

 mostrarGrupos() {
   this.gruposVisible = true;
   this.privadosVisible = false;
 }

 mostrarPrivados() {
   this.gruposVisible = false;
   this.privadosVisible = true;
 }
}
