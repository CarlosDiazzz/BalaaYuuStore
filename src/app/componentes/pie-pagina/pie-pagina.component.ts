import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-pagina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-pagina.component.html',
  styleUrl: './pie-pagina.component.css'
})
export class PiePaginaComponent {
  // Año actual para el copyright
  currentYear = new Date().getFullYear();

  // Datos de contacto
  contacto = {
    telefono: '+52 951 613 3662',
    email: 'info@balaayuu.com',
    direccion: 'Oaxaca de Juárez, Oaxaca, México'
  };

  // Enlaces a redes sociales
  redesSociales = [
    { nombre: 'Instagram', icono: 'bi-instagram', url: 'https://instagram.com/balaa_yuu' }
  ];
}
