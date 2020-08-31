import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IssueType} from '../../models/issue-type';
import {environment} from '../../../environments/environment';
import {Issue} from '../../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  constructor(private http: HttpClient) {
  }

  loadAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues`);
  }
}
