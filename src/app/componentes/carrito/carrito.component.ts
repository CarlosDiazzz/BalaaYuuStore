import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito.service';
import { ProductoService } from '../../servicios/producto.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  
  constructor(
    public carritoService: CarritoService,
    private productoService: ProductoService
  ) {}
  
  pagar() {
    // Verificar si hay elementos en el carrito
    if (this.carritoService.getCarrito().length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Verificar stock antes de procesar el pago
    this.carritoService.verificarStock().then(hayStock => {
      if (hayStock) {
        const resultado = this.carritoService.pagar();
        if (resultado) {
          alert('Pago procesado con éxito');
        } else {
          alert('Error al procesar el pago');
        }
      } else {
        alert('No hay suficiente stock para completar la compra');
      }
    });
  }

  // Método auxiliar para obtener el stock actual del producto
  obtenerStockActual(productoId: string): number {
    let stockActual = 0;
    this.productoService.getProductos().pipe(take(1)).subscribe(productos => {
      const producto = productos.find(p => p.id === productoId);
      if (producto) {
        stockActual = producto.stock;
      }
    });
    return stockActual;
  }
}