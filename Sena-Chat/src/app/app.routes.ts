import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "registro", component: RegistroComponent },
    { path: 'bienvenida/:usuario', component: BienvenidaComponent},
    { path: 'chat/:documento/:ficha/:grupo', component: ChatComponent},
    { path: 'chat/:documento/:ficha', component: ChatComponent},
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: '**', redirectTo: 'login', pathMatch: "full" }
    
    // { path: 'confi', component: ConfiComponent },
    // { path: 'contrasena', component: ContrasenaComponent},
    // { path: 'vis-perfil/:documento/:ficha', component: VisPerfilComponent},
     
];
