import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Modelos/usuarios';


@Injectable({
  providedIn: 'root'
})
export class VisPerfilService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  buscarDatos(datos: any) {
    return this.http.get<Usuario>(`${this.url}/usuario/${datos}`);
  }
}