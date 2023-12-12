import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private router: Router) { }

  set(key: string, value: string){
    sessionStorage.setItem(key, value);
  }

  get(key: string){
    return sessionStorage.getItem(key);
  }

  clear(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
