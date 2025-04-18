import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { Observable } from 'rxjs';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Added RouterModule import

@Component({
  // Removed invalid 'imports' property
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  clientes: Cliente[] | null = null;

  constructor(private clienteService: ClienteService) {}
  ngOnInit() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
}
