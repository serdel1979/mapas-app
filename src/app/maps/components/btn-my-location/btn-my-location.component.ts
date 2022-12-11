import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent{

  constructor(private mapService: MapService, private placeService: PlacesService) { }

 
  irInicio(){
    if(!this.placeService.isUserLocationReady){
      throw Error('No hay localización de usuario!!!');
    }
    if(!this.mapService.isMapReady){
       throw Error('El mapa no está listo!!!');
    }
    this.mapService.flyTo(this.placeService.userLocation!)
  }


}
