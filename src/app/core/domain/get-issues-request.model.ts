import {IssueState} from './issue.model';

export type IssueSortParam = 'createdAt' | 'updatedAt' | 'state' | '-createdAt' | '-updatedAt' | '-state';
export type IssueIncludeParam = 'actions' | 'assignee' | 'creator' | 'issueType';
export type IssueImageParam = 'true' | 'false' | 'any';

export interface GetIssuesRequestModel {
  page: number;
  pageSize: number;
  image: IssueImageParam;
  search: string;
  state: IssueState[];
  sort: IssueSortParam[];
  include: IssueIncludeParam[];
}
