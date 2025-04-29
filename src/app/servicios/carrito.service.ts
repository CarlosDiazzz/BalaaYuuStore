import { Injectable } from '@angular/core';
import { Producto } from '../modelo/producto.model';
import { ProductoService } from './producto.service';

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
    // Buscar si ya existe el producto en el carrito
    const item = this.carrito.find(p => p.producto.id === producto.id);
    
    if (item) {
      // Si ya existe el producto en el carrito, aumentar la cantidad
      if (item.cantidad < producto.stock) {
        item.cantidad++;
        
        // Crear una copia del producto para actualizar el stock
        const productoActualizado = {...producto};
        productoActualizado.stock--;
        
        // Actualizar en Firebase
        this.productoService.modificarProducto(productoActualizado);
      }
    } else {
      // Si el producto no existe en el carrito y hay stock
      if (producto.stock > 0) {
        // Crear una copia del producto para el carrito
        const productoCopia = {...producto};
        
        // Crear una copia del producto para actualizar el stock
        const productoActualizado = {...producto};
        productoActualizado.stock--;
        
        // Actualizar en Firebase y agregar al carrito
        this.productoService.modificarProducto(productoActualizado);
        this.carrito.push({ producto: productoCopia, cantidad: 1 });
      }
    }
  }

  eliminarDelCarrito(productoId: string) {
    const item = this.carrito.find(i => i.producto.id === productoId);
    if (item) {
      // Buscar el producto actual en la base de datos para actualizar su stock
      this.productoService.getProductos().subscribe(productos => {
        const productoActual = productos.find(p => p.id === productoId);
        if (productoActual) {
          productoActual.stock += item.cantidad;
          this.productoService.modificarProducto(productoActual);
        }
        // Eliminar del carrito después de actualizar el stock
        this.carrito = this.carrito.filter(i => i.producto.id !== productoId);
      }, error => {
        console.error('Error al obtener productos:', error);
      });
    }
  }

  actualizarCantidad(productoId: string, nuevaCantidad: number) {
    const item = this.carrito.find(p => p.producto.id === productoId);
    if (item) {
      const diferencia = nuevaCantidad - item.cantidad;
      if (diferencia === 0) return;

      // Buscar el producto actual en la base de datos para actualizar correctamente
      this.productoService.getProductos().subscribe(productos => {
        const productoActual = productos.find(p => p.id === productoId);
        if (productoActual) {
          const nuevoStock = productoActual.stock - diferencia;
          if (nuevoStock < 0) return;

          productoActual.stock = nuevoStock;
          item.cantidad = nuevaCantidad;
          this.productoService.modificarProducto(productoActual);
        }
      }, error => {
        console.error('Error al obtener productos:', error);
      });
    }
  }

  vaciarCarrito() {
    // Actualizar el stock de todos los productos en el carrito
    this.productoService.getProductos().subscribe(productos => {
      for (const item of this.carrito) {
        const productoActual = productos.find(p => p.id === item.producto.id);
        if (productoActual) {
          productoActual.stock += item.cantidad;
          this.productoService.modificarProducto(productoActual);
        }
      }
      this.carrito = [];
    }, error => {
      console.error('Error al obtener productos:', error);
    });
  }

  obtenerTotal() {
    return this.carrito.reduce((total, item) => total + item.producto.price * item.cantidad, 0);
  }
}