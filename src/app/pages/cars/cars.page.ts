import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { async } from "rxjs/internal/scheduler/async";
//leaflet imports
import * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { Map, tileLayer, marker } from "leaflet";

import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import * as ELG from "esri-leaflet-geocoder";
import { GetgeoService } from "src/app/services/getgeo.service";
import { AuthenticationService } from "src/app/authentication.service";
@Component({
  selector: "app-cars",
  templateUrl: "./cars.page.html",
  styleUrls: ["./cars.page.scss"],
})
export class carsPage implements OnInit {
  map: Leaflet.Map;
  properties = [];
  caseStatus;
  isLoaded
  constructor(private auth : AuthenticationService ,private getService: GetgeoService) {}

  ngOnInit() {
    // console.log("gg"+this.getService.getCars())
    this.isLoaded=false
  }
  
  logout(){ this.auth.logout();}

  ionViewDidEnter() {
    // it is the opposite here
    this.map = new Leaflet.Map("map").setView([36.8065, 10.1815], 16);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "IonicTutorial",
    }).addTo(this.map);

    //Fetching the markers from the json
    // fetch('./assets/markers.json')
    this.getService
      .getCars()
      .then((res) => res)
      .then((data) => {
        this.isLoaded=true
        console.log("DATA: ", data);
        this.properties = data.cars;

        for (const marker of this.properties) {
          //Markers color depending on the case's status, Urgent will be red, Non urgent Green
          var UrgentMarker = new Leaflet.Icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });
          var NonUrgentMarker = new Leaflet.Icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });

          var latlng = [marker.latitude, marker.longitude];
          console.log("latlng: " + latlng);

          //reverse geociding to display the exact address of the marker
          new ELG.ReverseGeocode().latlng(latlng).run((error, result) => {
            if (error) {
              return;
            }
            //check the marker's status
            if (marker.isUrgent == true) {
              this.caseStatus = UrgentMarker;
            } else {
              this.caseStatus = NonUrgentMarker;
            }
            Leaflet.marker([marker.latitude, marker.longitude], {
              icon: this.caseStatus,
            })
              .addTo(this.map)
              .bindPopup(
                "<br>" +
                  "Cars's Type  :" +
                  "<br>" +
                marker.type +
                  "<br>" +
                  "Exact place :" +
                  "<br>" +
                  result.address.Match_addr +
                  "<br>" +
                  "Cars Matricul: " +
                  marker.matricule
              );
          });
        }
      })

      .catch((err) => console.error(err));
  }
}
