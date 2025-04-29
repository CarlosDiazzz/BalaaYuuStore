import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tlapazola-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tlapazola-info.component.html',
  styleUrls: ['./tlapazola-info.component.css']
})
export class TlapazolaInfoComponent {
  // Datos estáticos para el componente
  pueblo = {
    nombre: 'San Marcos Tlapazola',
    ubicacion: 'Región de los Valles Centrales, Oaxaca',
    artesania: 'Barro Rojo'
  };
} 