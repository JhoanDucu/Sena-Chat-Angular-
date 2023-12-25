import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ChatComponent } from './chat/chat.component';
import { ConfiComponent } from './confi/confi.component';
import { VisPerfilComponent } from './vis-perfil/vis-perfil.component';
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { AdministradorComponent } from './administrador/administrador.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "registro", component: RegistroComponent },
    { path: 'bienvenida', component: BienvenidaComponent},
    { path: 'chat', component: ChatComponent},
    { path: 'confi', component: ConfiComponent },
    { path: 'vis-perfil', component: VisPerfilComponent},
    { path: 'contrasena', component: ContrasenaComponent},
    { path: 'admin', component: AdministradorComponent},
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: '**', redirectTo: 'login', pathMatch: "full" },
];
