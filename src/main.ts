import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZGVsIiwiYSI6ImNsYmlrajkxZjEweWo0MWxqbDhreW1oYzgifQ.mW3OCLSam2IsoIUyhwhc0A';

if(!navigator.geolocation){
  alert('Navegador incompatible!!!');
  throw new Error('Navegador incompatible!!!');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
