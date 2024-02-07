import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";

  traerUsuarios = () => this.http.get(`${this.url}/admin/usuarios`);

}
