import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
//https://api.mapbox.com/geocoding/v5/mapbox.places/-57.92893035127791,-34.922310856765115.json?country=ar&types=place%2Cpostcode%2Caddress&language=es&limit=1&access_token=pk.eyJ1Ijoic2VyZGVsIiwiYSI6ImNrdDdseW1vejB0cjEycW84cDU4bm1pMHcifQ.xZSU9tC-5DV1HDgOb_lAVA
  
  constructor(private http: HttpClient) { }



}
