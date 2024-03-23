import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Modelos/usuarios';
import { url } from '../../../servidor';

@Injectable({
  providedIn: 'root'
})
export class VisPerfilService {
  constructor(private http: HttpClient) { }

  buscarDatos(datos: any) {
    return this.http.get<Usuario>(`${url}/usuario/${datos}`);
  }
}