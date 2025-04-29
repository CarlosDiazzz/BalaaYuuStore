import { Component, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../../modelo/producto.model';
import { ProductoService } from '../../servicios/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-producto-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos-catalogo.component.html',
  styleUrls: ['./productos-catalogo.component.css']
})
export class ProductosCatalogoComponent {
  productos: Producto[] | null = null;
  producto: Producto = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private productoServicio: ProductoService) {}

  ngOnInit() {
    this.productoServicio.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  // Agregar producto al carrito
  agregarAlCarrito(producto: Producto) {
    alert(`"${producto.name}" agregado al carrito.`);
    // Aquí puedes implementar la lógica para manejar el carrito de compras
  }

  // Agregar un producto nuevo
  agregarProducto(productoForm: NgForm) {
    const { value, valid } = productoForm;
    if (valid) {
      this.productoServicio.agregarProducto(value).then(() => {
        productoForm.resetForm();
        this.cerrarModal();
      });
    }
  }

  // Eliminar un producto
  eliminarProducto(id: string) {
    this.productoServicio.eliminarProducto(id);
  }

  // Cerrar modal
  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
}
