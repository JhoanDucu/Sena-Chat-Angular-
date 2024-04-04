import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  constructor(private http: HttpClient) { }
  traerGrupos() {
    return this.http.get(`${url}/admin/grupos`);
  }
  traerIdFichas() {
    return this.http.get(`${url}/admin/num-fichas`);
  }
  agregarGrupo(datos: any) {
    return this.http.post(`${url}/admin/agregar-grupo`, datos);
  }
  traerGrupoPorId(id: any) {
    return this.http.get(`${url}/admin/grupo/${id}`);
  }
  editarGrupo(datos: any, id: any) {
    return this.http.put(`${url}/admin/editar-grupo/${id}`, datos);
  }
  traerMiembros(id: any) {
    return this.http.get(`${url}/admin/miembros/${id}`);
  }
  traerFaltantes(datos: any) {
    return this.http.post(`${url}/admin/miembros-faltantes`, datos);
  }
  agregarMiembro(datos: any) {
    return this.http.post(`${url}/admin/agregar-miembro`, datos);
  }
  eliminarMiembro(datos: any, id: any) {
    return this.http.put(`${url}/admin/eliminar-miembro/${id}`, datos);
  }
  comprobarMiembro(usuario: any, grupo: any){
    return this.http.get(`${url}/admin/miembro/${usuario}/${grupo}`);
  }
  actualizarMiembro(datos: any, id: any){
    return this.http.put(`${url}/admin/actualizar-miembro/${id}`, datos);
  }
}