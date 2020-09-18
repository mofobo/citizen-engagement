import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as L from 'leaflet';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit, AfterViewInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  map;
  marker = {};


  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png'
    })
  };

  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  formGroup: FormGroup;

  bernZytglogge = {
    lat: 46.947988,
    lng: 7.447792
  };

  maxZoom = 19;

  constructor(private formBuilder: FormBuilder) {
  }

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      latitudeCtrl: ['', Validators.required],
      longitudeCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.createMap();
    this.getBrowserLocation();
  }

  createMap() {
    this.map = L.map('map').fitWorld();
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: this.maxZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);

    this.map.on('click', e => {
      console.log(e.latlng); // get the coordinates
      this.replaceMarker(e.latlng.lat, e.latlng.lng);

      this.firstFormGroup.get('latitudeCtrl').setValue(e.latlng.lat);
      this.firstFormGroup.get('longitudeCtrl').setValue(e.latlng.lng);

      this.flyToLocation(e.latlng.lat, e.latlng.lng);
    });
  }

  getBrowserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.flyToLocation(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.error('No support for geolocation');
      this.flyToLocation(this.bernZytglogge.lat, this.bernZytglogge.lng);
    }
  }

  flyToLocation(latitude: number, longitude: number) {
    this.map.flyTo([latitude, longitude], 19);
  }

  private replaceMarker(latitude: number, longitude: number) {
    if (this.marker !== undefined) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([latitude, longitude], this.markerIcon).addTo(this.map);
  }
}
