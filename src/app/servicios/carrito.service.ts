import { Injectable } from '@angular/core';
import { Producto } from '../modelo/producto.model';
import { ProductoService } from './producto.service';
import { Observable, take, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: { producto: Producto, cantidad: number }[] = [];

  constructor(private productoService: ProductoService) {}

  getCarrito() {
    return this.carrito;
  }

  agregarAlCarrito(producto: Producto) {
    // Verificamos primero el stock actual del producto
    this.productoService.getProductos().pipe(take(1)).subscribe(productos => {
      const productoActual = productos.find(p => p.id === producto.id);
      
      if (!productoActual || productoActual.stock <= 0) {
        console.log('No hay stock disponible');
        return;
      }

      // Buscar si ya existe el producto en el carrito
      const itemEnCarrito = this.carrito.find(p => p.producto.id === producto.id);
      
      if (itemEnCarrito) {
        // Verificar que la cantidad en el carrito no supere el stock
        const cantidadTotal = itemEnCarrito.cantidad + 1;
        if (cantidadTotal <= productoActual.stock) {
          itemEnCarrito.cantidad++;
          console.log(`Producto incrementado en carrito: ${productoActual.name}`);
        } else {
          console.log('No hay más stock disponible para este producto');
        }
      } else {
        // Crear una copia del producto para el carrito
        const productoCopia = { ...productoActual };
        this.carrito.push({ producto: productoCopia, cantidad: 1 });
        console.log(`Producto agregado al carrito: ${productoActual.name}`);
      }
    });
  }

  eliminarDelCarrito(productoId: string) {
    this.carrito = this.carrito.filter(i => i.producto.id !== productoId);
  }

  actualizarCantidad(productoId: string, nuevaCantidad: number) {
    // Verificar primero el stock actual del producto
    this.productoService.getProductos().pipe(take(1)).subscribe(productos => {
      const productoActual = productos.find(p => p.id === productoId);
      const item = this.carrito.find(p => p.producto.id === productoId);
      
      if (!productoActual || !item) return;
      
      // Verificar que la nueva cantidad no exceda el stock disponible
      if (nuevaCantidad <= productoActual.stock && nuevaCantidad >= 1) {
        item.cantidad = nuevaCantidad;
      } else if (nuevaCantidad > productoActual.stock) {
        // Si excede el stock, ajustamos al máximo disponible
        item.cantidad = productoActual.stock;
      }
    });
  }

  vaciarCarrito() {
    this.carrito = [];
  }

  pagar() {
    if (this.carrito.length === 0) {
      return false;
    }

    // Actualizamos el stock de los productos en la base de datos
    this.productoService.getProductos().pipe(
      take(1),
      switchMap(productos => {
        const actualizaciones = [];
        
        for (const item of this.carrito) {
          const productoActual = productos.find(p => p.id === item.producto.id);
          
          if (productoActual) {
            // Verificar si hay suficiente stock
            if (productoActual.stock < item.cantidad) {
              console.error(`Stock insuficiente para ${productoActual.name}`);
              return Promise.reject(`Stock insuficiente para ${productoActual.name}`);
            }
            
            // Actualizar el stock
            const nuevoStock = productoActual.stock - item.cantidad;
            const productoActualizado = { ...productoActual, stock: nuevoStock };
            actualizaciones.push(this.productoService.modificarProducto(productoActualizado));
          }
        }
        
        return Promise.all(actualizaciones);
      })
    ).subscribe({
      next: () => {
        this.vaciarCarrito();
        console.log('Pago procesado correctamente');
        return true;
      },
      error: (error) => {
        console.error('Error al procesar el pago:', error);
        return false;
      }
    });
    
    return true;
  }

  obtenerTotal() {
    return this.carrito.reduce((total, item) => total + item.producto.price * item.cantidad, 0);
  }

  // Verificar si hay suficiente stock para todos los productos en el carrito
  verificarStock(): Promise<boolean> {
    return new Promise((resolve) => {
      this.productoService.getProductos().pipe(take(1)).subscribe(productos => {
        for (const item of this.carrito) {
          const productoActual = productos.find(p => p.id === item.producto.id);
          if (!productoActual || productoActual.stock < item.cantidad) {
            resolve(false);
          }
        }
        resolve(true);
      });
    });
  }
}