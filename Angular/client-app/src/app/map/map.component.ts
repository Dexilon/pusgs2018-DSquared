import { Component, OnInit, Input } from '@angular/core';

import { MapInfo } from './map-info.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class MapComponent implements OnInit {
  mapInfo: MapInfo;
  
    ngOnInit() {
    }
  
    constructor(){
      this.mapInfo = new MapInfo(45.242268, 19.842954, 
      "assets/ftn.png",
      "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    }
  
    placeMarker($event){
      localStorage.setItem('branchLatitude',$event.coords.lat);
      localStorage.setItem('branchLongitude',$event.coords.lng);
    }
}
