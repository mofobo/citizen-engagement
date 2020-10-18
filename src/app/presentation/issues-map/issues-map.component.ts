import {Component, OnInit} from '@angular/core';
import {GetIssuesRequestModel} from '../../core/domain/get-issues-request.model';
import {Router} from '@angular/router';
import {GetIssuesUsecase} from '../../core/usecases/get-issues.usecase';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {IssueModel} from '../../core/domain/issue.model';
import {GetApiInformationUsecase} from '../../core/usecases/get-api-information.usecase';
import * as L from 'leaflet';
import {GetIssuesResponseModel} from '../../core/domain/get-issues-response.model';

@Component({
  selector: 'app-issues-map',
  templateUrl: './issues-map.component.html',
  styleUrls: ['./issues-map.component.scss']
})
export class IssuesMapComponent implements OnInit {
  map;
  markers = [];
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

  private issuesSubject = new BehaviorSubject<IssueModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private getApiInformationUsecase: GetApiInformationUsecase,
    private getIssuesUsecase: GetIssuesUsecase,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createMap();
    this.oberveIssues();
    this.loadIssues();
  }

  createMap() {
    this.map = L.map('issues-map').fitWorld();
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: this.maxZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);
  }

  loadIssues() {
    this.loadingSubject.next(true);

    this.getApiInformationUsecase
      .execute().subscribe(
      value => {
        console.log('API-INFO', JSON.stringify(value));
        const pages = value.issues / 50;
        const sources = [];
        for (let _i = 0; _i < pages; _i++) {
          const req: GetIssuesRequestModel = {
            page: _i,
            pageSize: 50,
            image: 'any',
            search: '',
            state: [],
            sort: [],
            include: ['creator', 'issueType']
          };
          sources.push(this.getIssuesUsecase.execute(req));
        }
        forkJoin(sources)
          .subscribe(results => {
            const issues: IssueModel[] = [];
            for (const resp of results) {
              issues.push.apply(issues, (resp as GetIssuesResponseModel).issues);
            }
            this.issuesSubject.next(issues);
          });
      }
    );
  }

  onRowClicked(id: string) {

  }

  navigateToIssueDetails(id: string) {
    this.router.navigate(['issue-details', id]);
  }

  private addMarker(issue: IssueModel) {
    const marker = L.marker([issue.location.coordinates[1], issue.location.coordinates[0]], this.markerIcon);
    this.markers.push(marker);
    const txt = `<a>${issue.creator.name}</a><br>` + `<a>${issue.issueType.name}</a><br>` + '<a mat-button style="text-decoration: underline" class="details" [routerLink]="\'create-issue\' "> details </a>';
    marker.bindPopup(txt);
    marker.on('popupopen', (a) => {
      const popUp = a.target.getPopup();
      popUp.getElement()
        .querySelector('.details')
        .addEventListener('click', e => {
          this.navigateToIssueDetails(issue.id);
        });
    });
    marker.addTo(this.map);
  }

  private oberveIssues() {
    this.issuesSubject.subscribe(value => {
      if (value.length > 0) {
        for (const issue of value) {
          this.addMarker(issue);
        }
        const group = L.featureGroup(this.markers);
        this.map.flyToBounds(group.getBounds().pad(0.5));
      }
    });
  }
}
