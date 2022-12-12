import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  public userLocation:[number,number] | undefined;


  public isLoadingPlaces: boolean = false;
  public Places: Feature[] = [];

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor(private http: HttpClient) {
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

//https://api.mapbox.com/geocoding/v5/mapbox.places/-57.92893035127791,-34.922310856765115.json?country=ar&types=place%2Cpostcode%2Caddress&language=es&limit=1&access_token=pk.eyJ1Ijoic2VyZGVsIiwiYSI6ImNrdDdseW1vejB0cjEycW84cDU4bm1pMHcifQ.xZSU9tC-5DV1HDgOb_lAVA
  
  getPlacesByQuery(query: string=''){
   this.isLoadingPlaces = true;
   this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ar&types=place%2Cpostcode%2Caddress&language=es&limit=1&access_token=pk.eyJ1Ijoic2VyZGVsIiwiYSI6ImNrdDdseW1vejB0cjEycW84cDU4bm1pMHcifQ.xZSU9tC-5DV1HDgOb_lAVA`)
              .subscribe(resp=>{
                this.isLoadingPlaces = false;
                this.Places = resp.features;
              })
  }



}
