import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelo/producto.model';
import { ProductoService } from '../../servicios/producto.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './agregar-producto.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AgregarProductoComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = this.nuevoProducto();

  editando = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  agregar(form: NgForm) {
    if (form.valid) {
      this.productoService.agregarProducto(this.producto);
      form.resetForm();
      this.producto = this.nuevoProducto();
    }
  }

  editar(producto: Producto) {
    this.producto = { ...producto };
    this.editando = true;
  }

  guardarCambios(form: NgForm) {
    if (form.valid && this.producto.id) {
      this.productoService.modificarProducto(this.producto);
      form.resetForm();
      this.producto = this.nuevoProducto();
      this.editando = false;
    }
  }

  eliminar(id?: string) {
    if (id) {
      this.productoService.eliminarProducto(id);
    }
  }

  cancelarEdicion(form: NgForm) {
    form.resetForm();
    this.producto = this.nuevoProducto();
    this.editando = false;
  }

  private nuevoProducto(): Producto {
    return { name: '', description: '', price: 0, stock: 0, imageUrl: '' };
  }
}
