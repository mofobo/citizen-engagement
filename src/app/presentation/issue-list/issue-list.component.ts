import {Component, OnInit, ViewChild} from '@angular/core';
import {GetIssuesUsecase} from '../../core/usecases/get-issues.usecase';
import {MatSort} from '@angular/material/sort';
import {IssuesDataSource} from './issues-data-source';
import {GetIssuesRequestModel} from '../../core/domain/get-issues-request.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  displayedColumns: string[] = ['description', 'state'];
  dataSource: IssuesDataSource;

  getIssuesRequest: GetIssuesRequestModel = {
    page: 1,
    pageSize: 10,
    image: 'false',
    search: '',
    state: [],
    sort: [],
    include: ['creator']
  };


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private getIssuesUsecase: GetIssuesUsecase) {
  }

  ngOnInit() {
    this.dataSource = new IssuesDataSource(this.getIssuesUsecase);
    this.dataSource.loadIssues(this.getIssuesRequest);
  }
}
