import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from "@angular/common/http";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class PlaceApiClient extends HttpClient{
    

    public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    constructor( handler: HttpHandler){
        super(handler);
    }

    public override get<T>( url: string, options:{
        params?: HttpParams | {
            [param: string]: string | number |  boolean | ReadonlyArray<string | number | boolean>;
        };
    }){

        url = this.baseUrl+url;
        return super.get<T>(url,{
          params:  {
                limit: 5,
                lenguage: 'es',
                access_token: environment.apiKey,
                ...options.params
            }
        });

    }

}