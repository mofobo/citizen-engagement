import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IssueTypeRepository} from '../../../core/repositories/issue-type.repository';
import {CreateIssueTypeRequestModel} from '../../../core/domain/create-issue-type-request.model';
import {IssueTypeModel} from '../../../core/domain/issue-type.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueTypeWebRepository extends IssueTypeRepository {


  constructor(
    private http: HttpClient) {
    super();
  }

  createIssueType(createIssueTypeRequest: CreateIssueTypeRequestModel): Observable<IssueTypeModel> {
    const url = `${environment.apiUrl}/issueTypes`;
    return this.http.post<any>(url, createIssueTypeRequest);
  }

  deleteIssue(issueType: IssueTypeModel): Observable<void> {
    const url = `${environment.apiUrl}/issueTypes/${issueType.id}`;
    return this.http.delete<any>(url);
  }

  getIssue(id: string): Observable<IssueTypeModel> {
    const url = `${environment.apiUrl}/issueTypes/${id}`;
    return this.http.get<any>(url);
  }

  getIssueTypes(): Observable<IssueTypeModel[]> {
    const url = `${environment.apiUrl}/issueTypes`;
    return this.http.get<any>(url);
  }

  updateIssue(issueType: IssueTypeModel): Observable<IssueTypeModel> {
    const url = `${environment.apiUrl}/issueTypes/${issueType.id}`;
    return this.http.patch<any>(url, issueType);
  }
}
