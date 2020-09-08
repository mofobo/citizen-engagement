import {IssueState} from './issue.model';

export type IssueSortParam = 'createdAt' | 'updatedAt' | 'state' | '-createdAt' | '-updatedAt' | '-state';
export type IssueIncludeParam = 'actions' | 'assignee' | 'creator' | 'issueType';

export interface GetIssuesRequestModel {
  page: number;
  pageSize: number;
  image: 'true' | 'false';
  search: string;
  state: IssueState[];
  sort: IssueSortParam[];
  include: IssueIncludeParam[];
}
