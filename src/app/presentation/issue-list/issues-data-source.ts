import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {IssueModel} from '../../core/domain/issue.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GetIssuesUsecase} from '../../core/usecases/get-issues.usecase';
import {GetIssuesRequestModel} from '../../core/domain/get-issues-request.model';
import {catchError, finalize} from 'rxjs/operators';

export class IssuesDataSource implements DataSource<IssueModel> {

  private issuesSubject = new BehaviorSubject<IssueModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private getIssuesUsecase: GetIssuesUsecase) {
  }

  connect(collectionViewer: CollectionViewer): Observable<IssueModel[]> {
    return this.issuesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.issuesSubject.complete();
    this.loadingSubject.complete();
  }

  loadIssues(getIssuesRequestModel: GetIssuesRequestModel) {
    this.loadingSubject.next(true);
    this.getIssuesUsecase.execute(getIssuesRequestModel).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(issues => {
      console.log('ISSUES', issues);
      this.issuesSubject.next(issues);
    });
  }
}
