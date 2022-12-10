import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: [
  ]
})
export class MapScreenComponent {


  get isUserLocationReady(){
    return this.placeService.isUserLocationReady;
  }

  constructor(private placeService: PlacesService) { }

  

}
