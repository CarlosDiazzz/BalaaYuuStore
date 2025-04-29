import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artesano } from '../../modelo/artesano.model';


declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

@Component({
  selector: 'app-artesanos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artesanos.component.html',
  styleUrl: './artesanos.component.css'
})
export class ArtesanosComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  artesano: Artesano = {
    id: 1,
    nombre: 'Doña Rosa Real Mateo de Nieto',
    biografia: 'Sin embargo, en la década de 1960, Doña Rosa Real Mateo de Nieto hizo un descubrimiento que cambió el barro negro. Lo que comenzó como un error se convirtió en una nueva técnica. Ella comenzó a quemar las piezas a una temperatura más baja y luego las pulió con cuarzo justo antes de que estuvieran completamente secas. El barro ya quemado adquiría un acabado pulido y un negro intenso.Estas piezas novedosas se vendieron rápidamente y a un precio alto, lo que atrajo mucha atención al pueblo. Muchos alfareros de San Bartolo volvieron a centrarse en hacer piezas de barro negro con esta nueva técnica.',
    lat: 16.911339,
    lng: -96.523161,
    fotoUrl: 'https://alfareriadonarosa.com.mx/wp-content/uploads/2022/01/Don%CC%83a-Rosa-galeri%CC%81a-2-05.jpg'
      };
  
  private map: any;
  private marker: any;
  private scriptLoaded = false;
  private scriptId = 'google-maps-script';
  private mapInitialized = false;

  ngOnInit(): void {
    console.log('Inicializando componente ArtesanosComponent');
    console.log('Datos del artesano:', this.artesano);
    this.loadGoogleMapsScript();
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit - mapContainer:', this.mapContainer);
    // Si el script ya está cargado, inicializar el mapa
    if (this.scriptLoaded && !this.mapInitialized) {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    // Limpiar el mapa cuando el componente se destruye
    if (this.map) {
      this.map = null;
    }
  }

  private loadGoogleMapsScript(): void {
    console.log('Intentando cargar el script de Google Maps');
    // Verificar si el script ya está cargado
    if (document.getElementById(this.scriptId)) {
      console.log('El script de Google Maps ya está cargado');
      this.scriptLoaded = true;
      this.initMap();
      return;
    }

    // Configurar la función de callback global
    window.initMap = () => {
      console.log('Callback initMap ejecutado');
      this.scriptLoaded = true;
      this.initMap();
    };

    try {
      // Crear y cargar el script de Google Maps
      const script = document.createElement('script');
      script.id = this.scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbvQI6kRWJyrBZKLYWwlJTMM8hJVKJNzg&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Agregar manejador de errores
      script.onerror = (error) => {
        console.error('Error al cargar el script de Google Maps:', error);
      };
      
      document.head.appendChild(script);
      console.log('Script de Google Maps agregado al documento');
    } catch (error) {
      console.error('Error al crear el script de Google Maps:', error);
    }
  }

  private initMap(): void {
    console.log('Inicializando mapa');
    console.log('mapContainer:', this.mapContainer);
    console.log('artesano:', this.artesano);
    
    if (!this.mapContainer || !this.artesano) {
      console.error('No se puede inicializar el mapa: mapContainer o artesano no disponible');
      return;
    }

    try {
      // Crear el mapa centrado en las coordenadas del artesano
      this.map = new window.google.maps.Map(this.mapContainer.nativeElement, {
        center: { lat: this.artesano.lat, lng: this.artesano.lng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });

      // Agregar un marcador en la ubicación del artesano
      this.marker = new window.google.maps.Marker({
        position: { lat: this.artesano.lat, lng: this.artesano.lng },
        map: this.map,
        title: this.artesano.nombre
      });
      
      this.mapInitialized = true;
      console.log('Mapa inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }
} 