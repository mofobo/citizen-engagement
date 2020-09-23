import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GetIssuesUsecase} from '../../core/usecases/get-issues.usecase';
import {MatSort} from '@angular/material/sort';
import {IssuesDataSource} from './issues-data-source';
import {GetIssuesRequestModel, IssueSortParam} from '../../core/domain/get-issues-request.model';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {merge} from 'rxjs';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['description', 'state', 'creator', 'assignee', 'createdAt', 'updatedAt'];
  dataSource: IssuesDataSource;
  initialGetIssuesRequest: GetIssuesRequestModel = {
    page: 1,
    pageSize: 50,
    image: 'any',
    search: '',
    state: [],
    sort: [],
    include: ['creator', 'assignee']
  };
  missingValueString = '-';
  issuesPaginationTotal: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private getIssuesUsecase: GetIssuesUsecase, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new IssuesDataSource(this.getIssuesUsecase);
    this.dataSource.issuesPaginationTotal.asObservable().subscribe(value => this.issuesPaginationTotal);
    this.dataSource.loadIssues(this.initialGetIssuesRequest);
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  loadLessonsPage() {
    console.log('SORT', this.sort);
    this.dataSource.loadIssues({
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      image: 'any',
      search: '',
      state: [],
      sort: this.readSortingParams(),
      include: ['creator', 'assignee']
    });
  }

  readSortingParams() {
    if (this.sort.direction === 'asc') {
      return [`${this.sort.active}` as IssueSortParam];
    } else if (this.sort.direction === 'desc') {
      return [`-${this.sort.active}` as IssueSortParam];
    }
    return [];
  }

  onRowClicked(id: string) {
    this.router.navigate(['issues', id]);
  }
}
