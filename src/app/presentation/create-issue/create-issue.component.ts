import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as L from 'leaflet';
import {GetUsersUsecase} from '../../core/usecases/get-users.usecase';
import {GetUsersRequestModel} from '../../core/domain/get-users-request.model';
import {UserModel} from '../../core/domain/user.model';
import {GetIssueTypesUsecase} from '../../core/usecases/get-issue-types.usecase';
import {IssueTypeModel} from '../../core/domain/issue-type.model';
import {CreateIssueUsecase} from '../../core/usecases/create-issue.usecase';
import {CreateIssueRequestModel} from '../../core/domain/create-issue-request.model';
import {GeoJson} from '../../core/domain/GeoJson';
import {Router} from '@angular/router';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit, AfterViewInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  map;
  marker = {};

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png'
    })
  };

  formGroup: FormGroup;
  bernZytglogge = {
    lat: 46.947988,
    lng: 7.447792
  };
  maxZoom = 19;

  users: UserModel[] = [];
  issueTypes: IssueTypeModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private getUsersUseCase: GetUsersUsecase,
    private getIssueTypeUseCase: GetIssueTypesUsecase,
    private createIssue: CreateIssueUsecase,
    private router: Router) {
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
      descriptionCtrl: ['', Validators.required],
      issueTypeCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      assigneeCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.createMap();
    this.getBrowserLocation();
    this.loadusers();
    this.loadIssueTypes();
  }

  createMap() {
    this.map = L.map('create-issue-map').fitWorld();
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
        if (this.marker === undefined) {
          this.flyToLocation(position.coords.latitude, position.coords.longitude);
        }
      });
    } else {
      console.error('No support for geolocation');
      if (this.marker === undefined) {
        this.flyToLocation(this.bernZytglogge.lat, this.bernZytglogge.lng);
      }
    }
  }

  flyToLocation(latitude: number, longitude: number) {
    this.map.flyTo([latitude, longitude], 19);
  }

  public create() {

    this.firstFormGroup.get('latitudeCtrl');

    const location: GeoJson = {
      type: 'Point',
      coordinates: [Number(this.firstFormGroup.get('longitudeCtrl').value), Number(this.firstFormGroup.get('latitudeCtrl').value)]
    };

    const createIssueRequest: CreateIssueRequestModel = {
      description: String(this.secondFormGroup.get('descriptionCtrl').value),
      issueTypeHref: this.secondFormGroup.get('issueTypeCtrl').value.href,
      assignee: this.thirdFormGroup.get('assigneeCtrl').value,
      location,
      tags: ['lol', 'dep']
    };

    console.log('CREATE', createIssueRequest);
    this.createIssue.execute(createIssueRequest).subscribe(value => {
      console.log('CREATED', value);
      this.router.navigateByUrl('/issues');
    });
  }

  private replaceMarker(latitude: number, longitude: number) {
    if (this.marker !== undefined) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([latitude, longitude], this.markerIcon).addTo(this.map);
  }

  private loadusers() {
    const getUsersRequest: GetUsersRequestModel = {
      page: 1,
      pageSize: 50,
      sort: ['name']
    };
    this.getUsersUseCase.execute(getUsersRequest).subscribe(value => {
      this.users = value.users;
      console.log('USERS', this.users);
    });
  }

  private loadIssueTypes() {
    this.getIssueTypeUseCase.execute().subscribe(value => {
      this.issueTypes = value;
    });
  }

}
