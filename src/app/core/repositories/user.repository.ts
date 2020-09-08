import {Observable} from 'rxjs';
import {UserModel} from '../domain/user.model';

export type UserSortType = 'name' | 'firstname' | 'lastname' | 'phone';

export abstract class UserRepository {
  abstract getUsers(page: number, pageSize: number, sort: UserSortType): Observable<UserModel[]>;

}
