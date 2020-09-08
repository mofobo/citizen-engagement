import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {CreateIssueRequestModel} from '../domain/create-issue-request.model';
import {GetIssuesRequestModel} from '../domain/get-issues-request.model';

export abstract class IssueRepository {
  abstract getIssues(getIssuesRequestModel: GetIssuesRequestModel): Observable<IssueModel[]>;

  abstract getIssue(id: string): Observable<IssueModel>;

  abstract createIssue(createIssueRequest: CreateIssueRequestModel): Observable<IssueModel>;
}
