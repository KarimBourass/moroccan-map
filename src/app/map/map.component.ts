import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  template: `<div #map class="w-[1200px] h-[600px]"></div> `,
  styleUrl: './map.component.scss',
})
export class MapComponent {
  @ViewChild('map') mapElement!: ElementRef;
  private map: L.Map | null = null;

  constructor() {
    afterNextRender(() => {
      this.initMap();
    });
  }

  private initMap(): void {
    // Morocco's center coordinates
    const moroccoCenter: L.LatLngExpression = [31.6295, -7.9811];

    // Initialize the map
    this.map = L.map(this.mapElement.nativeElement).setView(moroccoCenter, 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Add a marker for Morocco's capital (Rabat)
    const rabatMarker = L.marker([30.4278, -9.5981]).addTo(this.map);
    rabatMarker.bindPopup('Kamal home').openPopup();
  }
}
