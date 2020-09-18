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

  constructor(private formBuilder: FormBuilder) {
  }

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  ngAfterViewInit() {
    this.createMap();
    this.requestCurrentLocationIfAvailable();
  }

  createMap() {
    const parcThabor = {
      lat: 46.947988,
      lng: 7.447792
    };

    const zoomLevel = 17;
    this.map = L.map('map', {
      center: [parcThabor.lat, parcThabor.lng],
      zoom: zoomLevel
    });
    
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);
    this.addMarker(parcThabor);
  }

  addMarker(coords) {
    const marker = L.marker([coords.lat, coords.lng], {icon: this.smallIcon});
    marker.addTo(this.map);
  }

  flyToPosition = function (position) {
    const self = this;
    const myCurrentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    self.map.flyTo([position.coords.latitude, position.coords.longitude], 8);
  };

  private requestCurrentLocationIfAvailable() {
    if ('geolocation' in navigator) {
      const self = this;
      navigator.geolocation.getCurrentPosition(this.flyToPosition);
      console.log('HOHOHO');
    } else {
      console.log('FUUCK');
      /* la géolocalisation n'est pas disponible */
    }
  }

}
