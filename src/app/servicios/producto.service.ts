import { Injectable } from '@angular/core';
import { Producto } from '../modelo/producto.model';
import { Observable } from 'rxjs';
import {
  collection,
  collectionData,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  productos: Observable<Producto[]>;
  private productosRef: CollectionReference;
  private productosActualizados = new BehaviorSubject<void>(undefined);
  productosActualizados$ = this.productosActualizados.asObservable();

  constructor(private firestore: Firestore) {
    // Configuración para obtener el listado de productos
    this.productosRef = collection(this.firestore, 'productos');
    const consulta = query(this.productosRef, orderBy('name', 'asc'));
    this.productos = collectionData(consulta, { idField: 'id' }) as Observable<
      Producto[]
    >;
  }

  // Método para obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.productos;
  }

  // Método para agregar un producto
  agregarProducto(producto: Producto) {
    return addDoc(this.productosRef, producto);
  }

  // Método para eliminar un producto
  eliminarProducto(id: string) {
    const productoDoc = doc(this.firestore, `productos/${id}`);
    return deleteDoc(productoDoc);
  }

  // Método para modificar un producto (en caso de editarlo)
  modificarProducto(producto: Producto) {
    const productoDoc = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(productoDoc, { ...producto }).then(() => {
      this.productosActualizados.next(); // Notifica cambio
    });
  }
  
}
