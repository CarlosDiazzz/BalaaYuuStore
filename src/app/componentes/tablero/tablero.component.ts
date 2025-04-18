import { Component } from '@angular/core';
import { ClientesComponent } from "../clientes/clientes.component";

@Component({
  selector: 'app-tablero',
  imports: [ClientesComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
