import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IssueType} from 'src/app/models/issue-type';

const apiUrl = 'https://masrad-2020-ce-mohammed.herokuapp.com/api';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeService {
  constructor(private http: HttpClient) {
  }

  loadAllIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(apiUrl + '/issueTypes');
  }
}
