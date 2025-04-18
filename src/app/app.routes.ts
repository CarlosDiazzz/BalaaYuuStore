import { Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';

export const routes: Routes = [
    {path: '', component: TableroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cliente/editar/:id', component: EditarClienteComponent},
    {path: '**', component: NoEncontradoComponent} // Redirige a la página principal si la ruta no coincide con ninguna definida
];
