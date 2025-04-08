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
      // Apply the filter to hide specific borders
      map.setFilter('admin_sub', ['!=', 'disputed_name', 'WesternSaharaclaimwithMorocco']);
      map.setFilter('admin_country', ['!=', 'disputed_name', 'WesternSaharaclaimwithMorocco']);
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
