import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) { }
  traerUsuarios() {
    return this.http.get(`${url}/admin/usuarios`);
  }
  traerIdFichas() {
    return this.http.get(`${url}/admin/num-fichas`);
  }
  agregarUsuario(datos: any) {
    return this.http.post(`${url}/admin/agregar-usuario`, datos);
  }
  traerUsuarioPorId(numdoc: any){
    return this.http.get(`${url}/admin/usuario/${numdoc}`);
  }
  editarUsuario(datos: any){
    return this.http.put(`${url}/admin/editar-usuario`, datos);
  }
}
