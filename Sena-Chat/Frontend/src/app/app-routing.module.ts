import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ConfiComponent } from './confi/confi.component'; 
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { VisPerfilComponent } from './vis-perfil/vis-perfil.component';

const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: "registro", component: RegistroComponent},
  { path: "login", component: LoginComponent},
  { path: 'chat/:documento/:ficha/:grupo', component: ChatComponent},
  { path: 'bienvenida/:usuario', component: BienvenidaComponent},
  { path: 'confi', component: ConfiComponent },
  { path: 'contrasena', component: ContrasenaComponent},
  { path: 'vis-perfil', component: VisPerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
