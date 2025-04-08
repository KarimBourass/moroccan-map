import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-map',
  template: `<div id="map" class="w-full h-full"></div>`,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'http://localhost:8080/styles/basic-preview/style.json',
      center: [-6.0, 32.0],
      zoom: 2
    });
  }
}
