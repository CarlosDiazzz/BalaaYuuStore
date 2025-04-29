import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientesComponent } from "../clientes/clientes.component";

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [RouterModule, ClientesComponent],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {
  // Aquí se pueden agregar propiedades y métodos si se necesita lógica adicional
}

