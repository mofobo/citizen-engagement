import {UserModel} from './user.model';

export interface GetUsersResponseModel {
  users: UserModel[];
  paginationTotal: number;
  nextPage: string;
  lastPage: string;
}
