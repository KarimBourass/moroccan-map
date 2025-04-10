import { Component, afterNextRender } from '@angular/core';
import maplibregl, { FilterSpecification } from 'maplibre-gl';

type LayerVisibility = 'visible' | 'none';

@Component({
  selector: 'app-map',
  template: `<div id="map" class="w-full h-full"></div>`,
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  private map: maplibregl.Map | null = null;

  constructor() {
    afterNextRender(() => {
      this.initializeMap();
    });
  }

  private initializeMap(): void {
    this.map = new maplibregl.Map({
      container: 'map',
      style: 'http://localhost:8080/styles/custom/style.json',
      center: [-8.0, 28.0],
      zoom: 1,
      maxBounds: [
        [-17.5, 20.5],
        [-0.9, 36.0],
      ],
    });
  }
}
