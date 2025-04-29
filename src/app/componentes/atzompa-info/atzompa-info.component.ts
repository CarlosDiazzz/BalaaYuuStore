import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atzompa-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atzompa-info.component.html',
  styleUrls: ['./atzompa-info.component.css']
})
export class AtzompaInfoComponent {
  // Datos estáticos para el componente
  pueblo = {
    nombre: 'Santa María Atzompa',
    ubicacion: 'Región de los Valles Centrales, Oaxaca',
    artesania: 'Cerámica Vidriada Verde'
  };

  // Aquí se pueden agregar propiedades y métodos si se necesita lógica adicional
} 