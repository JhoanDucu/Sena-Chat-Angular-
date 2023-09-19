import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";
  traerGrupos(ficha: any){
    return this.http.get(`${this.url}/chat/grupos/${ficha}`);
  }
}
