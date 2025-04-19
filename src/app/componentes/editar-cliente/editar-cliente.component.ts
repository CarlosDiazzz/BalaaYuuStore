import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css',
})
export class EditarClienteComponent {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  id: string | null = null; // Inicializa id como null o un string válido

  constructor(
    private clienteServicio: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtiene el id de la URL
    if (this.id) {
      this.clienteServicio.getCliente(this.id).subscribe((cliente) => {
        if (cliente) {
          this.cliente = cliente;
        } else {
          console.error('Cliente no encontrado: ', this.id);
          this.router.navigate(['/']); // Redirige si no se encuentra el cliente
        }
      });
    } else {
      console.error('ID no proporcioanado en la URL');
      this.router.navigate(['/']); // Redirige si no se encuentra el cliente
    }
  }
  guardar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    if (valid) {
      value.id = this.id;
      this.clienteServicio.modficarCliente(value);
      this.router.navigate(['/']);
    }
  }
  eliminar() {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
