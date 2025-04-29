import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-productos-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './productos-catalogo.component.html',
  styleUrl: './productos-catalogo.component.css'
})
export class ProductosCatalogoComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'Alebrije Tradicional',
      description: 'Colorida artesanía tallada en madera de copal, representando criaturas fantásticas de la cultura oaxaqueña.',
      price: 1200,
      imageUrl: ''
    },
    {
      id: '2',
      name: 'Barro Negro de Oaxaca',
      description: 'Vasija tradicional de barro negro con acabado brillante, elaborada a mano por artesanos de San Bartolo Coyotepec.',
      price: 850,
      imageUrl: ''
    },
    {
      id: '3',
      name: 'Textil Zapoteco',
      description: 'Tapete tejido a mano con motivos tradicionales zapotecos, elaborado con lana natural teñida con tintes naturales.',
      price: 2500,
      imageUrl: ''
    }
  ];

  agregarAlCarrito(producto: Product): void {
    const modal = document.getElementById('carritoModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }
}
