import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ConfiComponent } from './confi/confi.component';
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { VisPerfilComponent } from './vis-perfil/vis-perfil.component';
import { ChatDirective } from './directivas/chat.directive';
import { MensajesComponent } from './mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ChatComponent,
    BienvenidaComponent,
    ConfiComponent,
    ContrasenaComponent,
    VisPerfilComponent,
    ChatDirective,
    MensajesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      // {path: 'registro', component: RegistroComponent},
      // {path: 'login', component: LoginComponent},
      // {path: 'chat', component: ChatComponent},
      // {path: 'bienvenida/:usuario', component: BienvenidaComponent},
      {path: '', redirectTo: 'login', pathMatch: "full"},
      {path: '**', redirectTo: 'login', pathMatch: "full"}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
