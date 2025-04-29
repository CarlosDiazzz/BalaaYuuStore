import { Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { LoginGuardianService } from './servicios/login-guardian.service';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductosCatalogoComponent } from './componentes/productos-catalogo/productos-catalogo.component';

export const routes: Routes = [
    {path: '', component: TableroComponent, canActivate: [LoginGuardianService]}, // Ruta principal que carga el componente TableroComponent
    {path: 'login', component: LoginComponent},
    {path: 'registrarse', component: RegistroComponent},
    {path: 'productos', component: ProductosCatalogoComponent},
    {path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [LoginGuardianService]},
    {path: '**', component: NoEncontradoComponent} // Redirige a la página principal si la ruta no coincide con ninguna definida
];
