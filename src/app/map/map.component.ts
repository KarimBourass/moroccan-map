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
      const hiddenIdsMapping = {
        "5.9": [888, 887, 886, 885, 311, 312, 313, 314, 315, 316, 317, 318, 220, 298, 292, 297, 286, 277, 288, 310, 296, 287,289, 294, 308, 290, 834, 855, 835, 827, 820, 854, 830, 832, 786, 857, 805, 773,821, 822, 448, 638, 447,828],
        "6.6": [646, 647, 648, 649, 248, 249, 251, 244, 245, 246, 247, 250, 242, 191, 237, 241, 243, 240, 8, 183, 3, 6, 10, 1, 14, 16,9, 11, 15, 18, 12, 95, 104, 77, 96, 88, 82, 103, 91, 89, 12, 92, 83, 93,72, 106, 76, 84, 42, 45, 41 , 71],
        "7.61": [225, 226, 227, 228, 74, 75, 77, 70, 71, 72, 73, 76, 68, 69, 56, 64, 56, 67, 5, 57, 66, 54, 2, 4, 7, 16, 11,13,6, 8, 12,15,9,13, 16,4,14,7,5,],
        "8.61": [44, 16, 17, 18, 19, 10, 11, 12, 9, 19, 20, 21, 1, 21, 22, 25, 18, 17],
        "9.61": [8, 9, 6, 7, 2, 4, 5, 6, 14, 15, 16, 13, 12]
      };
    
      function getMatchingZoomKey(zoom: any) {
        const keys = Object.keys(hiddenIdsMapping)
          .map(Number)
          .sort((a, b) => a - b);
        for (const key of keys) {
          if (zoom < key) return key.toString();
        }
        return keys[keys.length - 1].toString(); // fallback to max if zoom >= all keys
      }
    
      function applyHiddenStates() {
        const zoomLevel = map.getZoom();
        const key = getMatchingZoomKey(zoomLevel);
        console.log('current zoom =>', zoomLevel)
        console.log('Choosed key =>', key)
        const hiddenIds = hiddenIdsMapping[key as keyof typeof hiddenIdsMapping];


        // Clear hidden state for ALL IDs across the mapping
        const allMappedIds = Object.values(hiddenIdsMapping).flat();
        const uniqueIds = [...new Set(allMappedIds)];
        // Set all features to visible first by using setFeatureState instead of removeFeatureState
        uniqueIds.forEach(id => {
          try {
            map.setFeatureState(
              {
                source: 'openmaptiles',
                sourceLayer: 'boundary',
                id: id
              },
              { hidden: false }
            );
          } catch (e) {
            console.log(`Error setting feature state for id ${id}:`, e);
          }
        });
    
        
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
    
      // Apply on load
      applyHiddenStates();
    
      // Optionally reapply on zoom
      map.on('zoomend', () => {
        applyHiddenStates();
      });
    
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
