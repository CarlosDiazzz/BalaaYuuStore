import { Component } from '@angular/core';
import { ClientesComponent } from "../clientes/clientes.component";

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [ClientesComponent],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {

}

