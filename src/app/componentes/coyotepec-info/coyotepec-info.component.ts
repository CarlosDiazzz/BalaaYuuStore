import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coyotepec-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coyotepec-info.component.html',
  styleUrl: './coyotepec-info.component.css'
})
export class CoyotepecInfoComponent {
  // Datos estáticos para el componente
  pueblo = {
    nombre: 'Santa María Coyotepec',
    ubicacion: 'Región de los Valles Centrales, Oaxaca',
    artesania: 'Barro Negro'
  };
} 