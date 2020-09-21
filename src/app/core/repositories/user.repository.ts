import {Observable} from 'rxjs';
import {GetUsersRequestModel} from '../domain/get-users-request.model';
import {GetUsersResponseModel} from '../domain/get-users-response.model';

export abstract class UserRepository {
  abstract getUsers(getUsersRequestModel: GetUsersRequestModel): Observable<GetUsersResponseModel>;

}
