import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {CreateIssueRequestModel} from '../domain/create-issue-request.model';
import {IssueTypeModel} from '../domain/issue-type.model';
import {CreateIssueTypeRequestModel} from '../domain/create-issue-type-request.model';

export abstract class IssueTypeRepository {
  abstract getIssueTypes(): Observable<IssueTypeModel[]>;
  abstract createIssueType(createIssueTypeRequest: CreateIssueTypeRequestModel): Observable<IssueTypeModel>;
  abstract getIssue(id: string): Observable<IssueTypeModel>;
  abstract updateIssue(issueType: IssueTypeModel): Observable<IssueTypeModel>;
  abstract deleteIssue(issueType: IssueTypeModel): Observable<void>;
}
