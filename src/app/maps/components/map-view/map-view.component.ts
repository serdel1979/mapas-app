import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  constructor(private placeService: PlacesService,
    private mapService: MapService) { }


  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  

  ngAfterViewInit(): void {
    if(!this.placeService.userLocation){
      throw new Error('No se puede establecer ubicación del usuario')
    }
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 13, // starting zoom
      });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `)

    const marker = new Marker({color:'red'})
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMap(map);
  }


}
