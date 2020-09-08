import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {IssueRepository} from '../repositories/issue.repository';

@Injectable({
  providedIn: 'root'
})
export class GetIssueUsecase implements UseCase<string, IssueModel> {

  constructor(private issueRepository: IssueRepository) {
  }

  execute(id: string): Observable<IssueModel> {
    return this.issueRepository.getIssue(id);
  }
}
