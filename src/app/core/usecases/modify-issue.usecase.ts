import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {IssueRepository} from '../repositories/issue.repository';
import {ModifyIssueRequestModel} from '../domain/modify-issue-request.model';

@Injectable({
  providedIn: 'root'
})
export class ModifyIssueUsecase implements UseCase<ModifyIssueRequestModel, IssueModel> {

  constructor(private issueRepository: IssueRepository) {
  }

  execute(modifyIssueRequest: ModifyIssueRequestModel): Observable<IssueModel> {
    return this.issueRepository.modifyIssue(modifyIssueRequest);
  }
}
