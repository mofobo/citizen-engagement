import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {CreateIssueRequestModel} from '../domain/create-issue-request.model';
import {GetIssuesRequestModel} from '../domain/get-issues-request.model';
import {GetIssuesResponseModel} from '../domain/get-issues-response.model';

export abstract class IssueRepository {
  abstract getIssues(getIssuesRequestModel: GetIssuesRequestModel): Observable<GetIssuesResponseModel>;

  abstract getIssue(id: string): Observable<IssueModel>;

  abstract deleteIssue(id: string): Observable<void>;

  abstract createIssue(createIssueRequest: CreateIssueRequestModel): Observable<IssueModel>;
}
