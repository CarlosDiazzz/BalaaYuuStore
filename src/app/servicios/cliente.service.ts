import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, orderBy, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes: Observable<Cliente[]>;

  constructor(private firestore: Firestore) { 
    //realizamos una consulta a la base de datos para el listado de clientes
    const clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, { idField: 'id' }) as Observable<Cliente[]>;    
  }
  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }
  
}

