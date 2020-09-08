import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {IssueTypeModel} from '../../core/domain/issue-type.model';

@Injectable({
  providedIn: 'root',
})
export class IssueTypeService {
  constructor(private http: HttpClient) {
  }

  loadAllIssueTypes(): Observable<IssueTypeModel[]> {
    return this.http.get<IssueTypeModel[]>(`${environment.apiUrl}/issueTypes`);
  }
}
