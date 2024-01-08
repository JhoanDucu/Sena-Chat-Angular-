import { Routes } from '@angular/router';
import { LoginComponent } from './usuario/login/login.component';
import { RegistroComponent } from './usuario/registro/registro.component';
import { BienvenidaComponent } from './usuario/bienvenida/bienvenida.component';
import { ChatComponent } from './usuario/chat/chat.component';
import { ConfiComponent } from './usuario/confi/confi.component';
import { VisPerfilComponent } from './usuario/vis-perfil/vis-perfil.component';
import { ContrasenaComponent } from './usuario/contrasena/contrasena.component';
import { PrincipalComponent } from './administrador/principal/principal.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "registro", component: RegistroComponent },
    { path: 'bienvenida', component: BienvenidaComponent},
    { path: 'chat', component: ChatComponent},
    { path: 'confi', component: ConfiComponent },
    { path: 'vis-perfil', component: VisPerfilComponent},
    { path: 'contrasena', component: ContrasenaComponent},
    { path: 'principal', component: PrincipalComponent},
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: '**', redirectTo: 'login', pathMatch: "full" },
];
