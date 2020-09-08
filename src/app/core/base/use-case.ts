import {Observable} from 'rxjs';
import {IssueModel} from '../domain/issue.model';

export interface UseCase<S, T> {
  execute(params: S): Observable<T>;
}
