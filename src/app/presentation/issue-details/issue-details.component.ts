import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GetIssueUsecase} from '../../core/usecases/get-issue.usecase';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';
import {IssueModel} from '../../core/domain/issue.model';
import * as L from 'leaflet';
import {DeleteIssueUsecase} from '../../core/usecases/delete-issue.usecase';


@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit, AfterViewInit {

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
    private getIssueUseCase: GetIssueUsecase,
    private deleteIssueUsecase: DeleteIssueUsecase,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getIssue(id);
  }

  ngAfterViewInit() {
    this.createMap();
  }

  createMap() {
    this.map = L.map('map').fitWorld();
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: this.maxZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);
  }

  flyToLocation(latitude: number, longitude: number) {
    this.map.flyTo([latitude, longitude], 19);
  }

  onDeleteClicked() {
    if (confirm('Are you sure to delete this Issue')) {
      this.deleteIssueUsecase.execute(this.issue.id).subscribe(
        value => {
          this.router.navigate(['issues']);
        },
        error => {
          console.error('error deleting issue', error);
        });
    }
  }

  onModifyClicked() {
    this.router.navigate(['modify-issue', this.issue.id]);
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
          const latitude = this.issue.location.coordinates[1];
          const longitude = this.issue.location.coordinates[0];
          this.replaceMarker(latitude, longitude);
          this.flyToLocation(latitude, longitude);
        }, error => {
          console.error('ISSUE-ERROR', error);
        }
      );
  }
}
