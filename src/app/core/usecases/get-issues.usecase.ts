import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {IssueRepository} from '../repositories/issue.repository';
import {GetIssuesRequestModel} from '../domain/get-issues-request.model';

@Injectable({
  providedIn: 'root'
})
export class GetIssuesUsecase implements UseCase<GetIssuesRequestModel, IssueModel[]> {

  constructor(private issueRepository: IssueRepository) {
  }

  execute(getIssuesRequest: GetIssuesRequestModel): Observable<IssueModel[]> {
    return this.issueRepository.getIssues(getIssuesRequest);
  }
}
