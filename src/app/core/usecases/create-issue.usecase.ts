import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {IssueRepository} from '../repositories/issue.repository';
import {CreateIssueRequestModel} from '../domain/create-issue-request.model';

@Injectable({
  providedIn: 'root'
})
export class CreateIssueUsecase implements UseCase<CreateIssueRequestModel, IssueModel> {

  constructor(private issueRepository: IssueRepository) {
  }

  execute(createIssueRequest: CreateIssueRequestModel): Observable<IssueModel> {
    return this.issueRepository.createIssue(createIssueRequest);
  }
}
