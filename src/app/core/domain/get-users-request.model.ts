export type UserSortType = 'name' | 'firstname' | 'lastname' | 'phone';

export interface GetUsersRequestModel {
  page: number;
  pageSize: number;
  sort: UserSortType[];
}
