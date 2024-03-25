import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  constructor(private http: HttpClient) { }
  traerGrupos(){
    return this.http.get(`${url}/admin/grupos`);
  }
  traerIdFichas(){
    return this.http.get(`${url}/admin/num-fichas`);
  }
  agregarGrupo(datos: any){
    return this.http.post(`${url}/admin/agregar-grupo`, datos);
  }
  traerGrupoPorId(id: any){
    return this.http.get(`${url}/admin/grupo/${id}`);
  }
}
