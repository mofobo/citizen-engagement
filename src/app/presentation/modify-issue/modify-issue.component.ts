import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IssueModel} from '../../core/domain/issue.model';
import * as L from 'leaflet';
import {BehaviorSubject, of} from 'rxjs';
import {GetIssueUsecase} from '../../core/usecases/get-issue.usecase';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, delay, finalize} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeoJson} from '../../core/domain/GeoJson';
import {IssueTypeModel} from '../../core/domain/issue-type.model';
import {GetIssueTypesUsecase} from '../../core/usecases/get-issue-types.usecase';
import {ModifyIssueRequestModel} from '../../core/domain/modify-issue-request.model';
import {ModifyIssueUsecase} from '../../core/usecases/modify-issue.usecase';

@Component({
  selector: 'app-modify-issue',
  templateUrl: './modify-issue.component.html',
  styleUrls: ['./modify-issue.component.scss']
})
export class ModifyIssueComponent implements OnInit, AfterViewInit {

  issueTypes: IssueTypeModel[] = [];

  formGroup: FormGroup;
  issue: IssueModel;
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
  maxZoom = 19;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private getIssueUseCase: GetIssueUsecase,
    private modifyIssueUsecase: ModifyIssueUsecase,
    private getIssueTypeUseCase: GetIssueTypesUsecase,
    private modifyIssue: ModifyIssueUsecase,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getIssue(id);
    this.formGroup = this.formBuilder.group({
      descriptionCtrl: ['', Validators.required],
      issueTypeCtrl: ['', Validators.required],
      latitudeCtrl: ['', Validators.required],
      longitudeCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.createMap();
    this.loadIssueTypes();
  }

  createMap() {
    this.map = L.map('modify-map').fitWorld();
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: this.maxZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);

    this.map.on('click', e => {
      console.log(e.latlng); // get the coordinates
      this.replaceMarker(e.latlng.lat, e.latlng.lng);
      this.formGroup.get('latitudeCtrl').setValue(e.latlng.lat);
      this.formGroup.get('longitudeCtrl').setValue(e.latlng.lng);
      this.flyToLocation(e.latlng.lat, e.latlng.lng);
    });
  }

  flyToLocation(latitude: number, longitude: number) {
    this.map.flyTo([latitude, longitude], 19);
  }

  onSaveClicked() {
    if (confirm('Are you sure to nodify this Issue?')) {
      this.modify();
    }
    this.router.navigate(['issue-details', this.issue.id]);
  }

  public modify() {
    const location: GeoJson = {
      type: 'Point',
      coordinates: [Number(this.formGroup.get('longitudeCtrl').value), Number(this.formGroup.get('latitudeCtrl').value)]
    };

    const modifyIssueRequest: ModifyIssueRequestModel = {
      id: this.issue.id,
      description: String(this.formGroup.get('descriptionCtrl').value),
      issueTypeHref: this.formGroup.get('issueTypeCtrl').value.href,
      location,
    };

    console.log('CREATE', modifyIssueRequest);
    this.modifyIssue.execute(modifyIssueRequest).subscribe(value => {
        delay(2000);
        this.router.navigate(['issue-details', this.issue.id]);
      },
      error => {
        console.error('error deleting issue', error);
      });
  }

  onCancelClicked() {
    this.router.navigate(['issue-details', this.issue.id]);
  }

  private replaceMarker(latitude: number, longitude: number) {
    if (this.marker !== undefined) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([latitude, longitude], this.markerIcon).addTo(this.map);
  }

  private getIssue(id: string) {
    this.loadingSubject.next(true);
    this.getIssueUseCase.execute(id)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        value => {
          this.issue = value as IssueModel;
          console.log('ISSUE', this.issue);
          this.setIssueInitValues();
        }, error => {
          console.error('ISSUE-ERROR', error);
        }
      );
  }

  private loadIssueTypes() {
    this.getIssueTypeUseCase.execute().subscribe(value => {
      this.issueTypes = value;
      this.setIssueTypeIfReady();
    });
  }

  private setIssueInitValues() {
    // set location to map
    const latitude = this.issue.location.coordinates[1];
    const longitude = this.issue.location.coordinates[0];
    this.replaceMarker(latitude, longitude);
    this.flyToLocation(latitude, longitude);

    // set location to textView
    this.formGroup.get('latitudeCtrl').setValue(this.issue.location.coordinates[1]);
    this.formGroup.get('longitudeCtrl').setValue(this.issue.location.coordinates[0]);
    this.formGroup.get('descriptionCtrl').setValue(this.issue.description);
    this.setIssueTypeIfReady();
  }

  private setIssueTypeIfReady() {
    if (this.issueTypes != null && this.issue != null) {
      // Issue type initial value can only be set when issue AND issueTypes are fetched.
      // TODO: Chain getIssueTypes and getIssue in order to have all the needed values when the form is initialized
      this.formGroup.get('issueTypeCtrl').setValue(this.issueTypes.find(value => value.id === this.issue.issueType.id));
    }
  }

}
