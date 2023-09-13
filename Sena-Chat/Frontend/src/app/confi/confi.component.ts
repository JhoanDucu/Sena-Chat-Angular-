import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-confi',
  templateUrl: './confi.component.html',
  styleUrls: ['./confi.component.css']
})
export class ConfiComponent {
  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  password2: string = '';
  showPassword2: boolean = false;

  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
  

}