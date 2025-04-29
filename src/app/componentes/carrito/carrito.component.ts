import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  
  constructor(public carritoService: CarritoService) {}
  
  pagar() {
    // Aquí implementarías la lógica de pago
    if (this.carritoService.getCarrito().length > 0) {
      alert('Pago procesado con éxito');
      this.carritoService.vaciarCarrito();
    } else {
      alert('El carrito está vacío');
    }
  }
}