import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {IssueModel} from '../../core/domain/issue.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GetIssuesUsecase} from '../../core/usecases/get-issues.usecase';
import {GetIssuesRequestModel} from '../../core/domain/get-issues-request.model';
import {catchError, finalize} from 'rxjs/operators';
import {GetIssuesResponseModel} from '../../core/domain/get-issues-response.model';

export class IssuesDataSource implements DataSource<IssueModel> {

  public issuesPaginationTotal = new BehaviorSubject<number>(0);
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
    ).subscribe((getIssuesResponseModel: GetIssuesResponseModel) => {
      console.log('getIssuesResponseModel.issues', getIssuesResponseModel.issues);
      console.log('getIssuesResponseModel.paginationTotal', getIssuesResponseModel.paginationTotal);
      this.issuesPaginationTotal.next(getIssuesResponseModel.paginationTotal);
      this.issuesSubject.next(getIssuesResponseModel.issues);
    });
  }
}
