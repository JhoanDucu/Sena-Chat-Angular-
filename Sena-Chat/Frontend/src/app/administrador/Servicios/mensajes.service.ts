import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  constructor(private http: HttpClient) { }
  traerMensajes(){
    return this.http.get(`${url}/admin/mensajes`);
  }
  agregarMensaje(datos: any){
    return this.http.post(`${url}/admin/agregar-mensaje`, datos);
  }
  traerMensajePorId(id: any){
    return this.http.get(`${url}/admin/mensaje/${id}`);
  }
  editarMensaje(datos: any, id: any){
    return this.http.put(`${url}/admin/editar-mensaje/${id}`, datos);
  }
}
