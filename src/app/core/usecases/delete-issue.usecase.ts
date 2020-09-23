import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';
import {IssueRepository} from '../repositories/issue.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteIssueUsecase implements UseCase<string, void> {

  constructor(private issueRepository: IssueRepository) {
  }

  execute(id: string): Observable<void> {
    return this.issueRepository.deleteIssue(id);
  }
}
