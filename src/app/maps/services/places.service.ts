import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  public userLocation:[number,number] | undefined;


  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor(
    private mapService: MapService,
    private http: PlaceApiClient) {
    this.getUserLocation();
  }



  public async getUserLocation(): Promise<[number,number]>{

    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=> {
            this.userLocation = [coords.longitude,coords.latitude ];
            resolve([coords.longitude,coords.latitude ])
        },
        (err)=>{
          alert('No se pudo obtener la geolocalización!!!');
          console.log(err);
          reject();
        }
      )
    });


  }
 
  getPlacesByQuery(query: string=''){
  
    if( query.length === 0){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if(!this.userLocation) throw Error('No hay userLocation')

    this.isLoadingPlaces = true;
    this.http.get<PlacesResponse>(`/${query}.json`,{
    params: {
      proximity: this.userLocation?.join(',')
    }
   })
              .subscribe(resp=>{
                this.isLoadingPlaces = false;
                this.places = resp.features;
                this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
              })
  }



}
