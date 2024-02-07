import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";

  traerMensajes = () => this.http.get(`${this.url}/admin/mensajes`);
}
