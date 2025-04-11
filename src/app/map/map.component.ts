import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';
import {MOROCCO_GEO_BOUNDARIES} from '../../assets/morocco-geoBoundaries';

@Component({
  selector: 'app-map',
  template: `<div id="map" class="w-full h-full"></div>`,
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'http://localhost:8080/styles/basic-preview/style.json',
      center: [-8.0, 28.0],
      zoom: 5,
      maxBounds: [
        [-17.5, 20.5],
        [-0.9, 36.0],
      ],
    });

    map.on('load', () => {
      const boundaryLayers = ['admin_country'];

      boundaryLayers.forEach(layerId => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, 'visibility', 'none');
        }
      });

      map.addSource('moroccoBorder', {
        type: 'geojson',
        data: MOROCCO_GEO_BOUNDARIES
      });

      map.addLayer({
        id: 'morocco-border-line',
        type: 'line',
        source: 'moroccoBorder',
        paint: {
          'line-color': '#727575',
          'line-width': 0.8
        }
      });
    });

  }
}
