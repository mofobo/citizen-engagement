import {Injectable} from '@angular/core';
import {IssueRepository} from '../../../core/repositories/issue.repository';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IssueModel} from '../../../core/domain/issue.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CreateIssueRequestModel} from '../../../core/domain/create-issue-request.model';
import {GetIssuesRequestModel} from '../../../core/domain/get-issues-request.model';
import {map} from 'rxjs/operators';
import {GetIssuesResponseModel} from '../../../core/domain/get-issues-response.model';

@Injectable({
  providedIn: 'root'
})
export class IssueWebRepository extends IssueRepository {

  constructor(
    private http: HttpClient) {
    super();
  }

  getIssues(getIssuesRequestModel: GetIssuesRequestModel): Observable<GetIssuesResponseModel> {
    const url = `${environment.apiUrl}/issues`;
    let httpParams = new HttpParams()
      .set('page', getIssuesRequestModel.page.toString())
      .set('pageSize', getIssuesRequestModel.pageSize.toString())
      .set('search', getIssuesRequestModel.search);
    if (getIssuesRequestModel.image !== 'any') {
      httpParams = httpParams.append('image', getIssuesRequestModel.image);
    }
    getIssuesRequestModel.sort.forEach(value => httpParams = httpParams.append('sort', value));
    getIssuesRequestModel.state.forEach(value => httpParams = httpParams.append('state', value));
    getIssuesRequestModel.include.forEach(value => httpParams = httpParams.append('include', value));

    return this.http.get<IssueModel[]>(url, {params: httpParams, observe: 'response'}).pipe(
      map((response) => {
          // Retrieve header
          const Link = this.parseLinkHeader(response.headers.get('Link'));

          const getIssuesResponseModel = {
            issues: response.body,
            paginationTotal: Number(response.headers.get('Pagination-Total')),
            nextPage: Link['next'],
            lastPage: Link['last']
          } as GetIssuesResponseModel;
          return getIssuesResponseModel;
        }
      ));
  }

  getIssue(id: string): Observable<IssueModel> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('include', 'actions');
    httpParams = httpParams.append('include', 'assignee');
    httpParams = httpParams.append('include', 'creator');
    httpParams = httpParams.append('include', 'issueType');

    const url = `${environment.apiUrl}/issues/${id}`;

    return this.http.get<IssueModel>(url, {params: httpParams});
  }

  deleteIssue(id: string): Observable<void> {
    const url = `${environment.apiUrl}/issues/${id}`;
    return this.http.delete<void>(url);
  }

  createIssue(createIssueRequest: CreateIssueRequestModel): Observable<IssueModel> {
    const url = `${environment.apiUrl}/issues`;
    return this.http
      .post<any>(url, createIssueRequest);
  }

  private parseLinkHeader(header) {
    if (header.length === 0) {
      return;
    }

    const parts = header.split(',');
    const links = {};
    parts.forEach(p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    return links;
  }
}
