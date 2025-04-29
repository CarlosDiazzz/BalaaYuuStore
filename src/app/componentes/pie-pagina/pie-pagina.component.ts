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
    telefono: '+52 951 123 4567',
    email: 'info@balaayuu.com',
    direccion: 'Oaxaca de Juárez, Oaxaca, México'
  };

  // Enlaces a redes sociales
  redesSociales = [
    { nombre: 'Facebook', icono: 'bi-facebook', url: 'https://facebook.com/balaayuu' },
    { nombre: 'Instagram', icono: 'bi-instagram', url: 'https://instagram.com/balaayuu' },
    { nombre: 'Twitter', icono: 'bi-twitter', url: 'https://twitter.com/balaayuu' },
    { nombre: 'YouTube', icono: 'bi-youtube', url: 'https://youtube.com/balaayuu' }
  ];
}
