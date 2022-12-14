import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {


  public selectedId:string='';

  constructor( private placeSrvice:PlacesService,
    private mapService: MapService) { }

  get isLoadingPlaces(): boolean{
    return this.placeSrvice.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placeSrvice.places;
  }

  flyTo(place: Feature){
    this.selectedId = place.id;
    const[lng, lat] = place.center;
    this.mapService.flyTo([lng,lat])
  }

  getDirections(place: Feature){
    console.log(place);
    if( !this.placeSrvice.userLocation) throw Error('No hay localización');

    this.placeSrvice.deletePlaces();

    const start = this.placeSrvice.userLocation;
    const end = place.center as [number,number];
    this.mapService.getRouteBetweenPoints(start,end);

  }
  

}
