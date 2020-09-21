import {IssueModel} from './issue.model';

export interface GetIssuesResponseModel {
  issues: IssueModel[];
  paginationTotal: number;
  nextPage: string;
  lastPage: string;
}
