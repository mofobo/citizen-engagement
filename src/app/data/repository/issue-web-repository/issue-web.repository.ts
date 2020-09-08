import {Injectable} from '@angular/core';
import {IssueRepository} from '../../../core/repositories/issue.repository';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IssueModel} from '../../../core/domain/issue.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CreateIssueRequestModel} from '../../../core/domain/create-issue-request.model';
import {GetIssuesRequestModel} from '../../../core/domain/get-issues-request.model';

@Injectable({
  providedIn: 'root'
})
export class IssueWebRepository extends IssueRepository {

  constructor(
    private http: HttpClient) {
    super();
  }

  getIssues(getIssuesRequestModel: GetIssuesRequestModel): Observable<IssueModel[]> {
    const url = `${environment.apiUrl}/issues`;

    console.log('getIssuesRequestModel', getIssuesRequestModel);

    let httpParams = new HttpParams()
      .set('page', getIssuesRequestModel.page.toString())
      .set('pageSize', getIssuesRequestModel.pageSize.toString())
      .set('image', getIssuesRequestModel.image)
      .set('search', getIssuesRequestModel.search);
    getIssuesRequestModel.sort.forEach(value => httpParams = httpParams.append('sort', value));
    getIssuesRequestModel.state.forEach(value => httpParams = httpParams.append('state', value));
    getIssuesRequestModel.include.forEach(value => httpParams = httpParams.append('include', value));

    return this.http.get<IssueModel[]>(url, {params: httpParams});
  }

  getIssue(id: string): Observable<IssueModel> {
    const url = `${environment.apiUrl}/issues/${id}`;
    return this.http
      .get<IssueModel>(url);
  }

  createIssue(createIssueRequest: CreateIssueRequestModel): Observable<IssueModel> {
    const url = `${environment.apiUrl}/issues`;
    return this.http
      .post<any>(url, createIssueRequest);
  }
}
