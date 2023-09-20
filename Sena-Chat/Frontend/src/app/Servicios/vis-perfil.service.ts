import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VisPerfilService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  buscarDatos(datos: any){
    return this.http.get(`${this.url}/usuario/${datos}`);
  }
}