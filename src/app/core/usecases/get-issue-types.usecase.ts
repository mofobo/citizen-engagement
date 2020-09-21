import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {IssueTypeRepository} from '../repositories/issue-type.repository';
import {IssueTypeModel} from '../domain/issue-type.model';

@Injectable({
  providedIn: 'root'
})
export class GetIssueTypesUsecase implements UseCase<void, IssueTypeModel[]> {

  constructor(private issueTypeRepository: IssueTypeRepository) {
  }

  execute(params: void): Observable<IssueTypeModel[]> {
    return this.issueTypeRepository.getIssueTypes();
  }
}
