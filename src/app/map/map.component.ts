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
      center: [-8.0, 28.0], 
      zoom: 5,
      maxBounds: [
        [-17.5, 20.5],
        [-0.9, 36.0]   
      ]
    });

    map.on('load', () => {
      const hiddenIds = [888, 887, 886, 885, 311, 312, 313, 314, 315, 
        316, 317, 318, 646, 647, 648, 649, 248, 249,251, 244, 245, 246, 
        247, 250, 242, 225, 226, 227, 228,74, 75, 77, 70, 71, 72, 73,
        76, 68, 69, 44, 16, 17,18, 19, 10, 11, 12, 9, 19,20, 21, 1, 21, 22,
        25, 18, 17, 8, 9, 6, 7, 2, 4, 5, 6, 14, 15, 16, 13, 12];
    
      function applyHiddenStates() {
        hiddenIds.forEach(id => {
          map.setFeatureState(
            {
              source: 'openmaptiles',
              sourceLayer: 'boundary',
              id: id
            },
            { hidden: true }
          );
        });
      }
    
      // Initial application
      applyHiddenStates();
    
      // Set paint property
      map.setPaintProperty('admin_country', 'line-opacity', [
        'case',
        ['boolean', ['feature-state', 'hidden'], false],
        0, // Hidden if true
        1  // Visible if false
      ]);
  
    });


    // map.on('load', () => {
    //   // Query features in the border layers (admin_sub and admin_country)
    //   const features = map.queryRenderedFeatures({ layers: ['admin_sub', 'admin_country'] });

    
    //   features.forEach(feature => {
    //     console.log('Feature ID:', feature.id);
    //     console.log('Feature Properties:', feature.properties);
    //     console.log('Feature Geometry:', feature.geometry);
    //   });
    // });
  }
}
