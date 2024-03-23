import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) { }
  traerUsuarios(){
    return this.http.get(`${url}/admin/usuarios`);
  }
}
