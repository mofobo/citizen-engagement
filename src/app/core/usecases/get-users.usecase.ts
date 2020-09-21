import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {GetUsersRequestModel} from '../domain/get-users-request.model';
import {GetUsersResponseModel} from '../domain/get-users-response.model';
import {UserRepository} from '../repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class GetUsersUsecase implements UseCase<GetUsersRequestModel, GetUsersResponseModel> {

  constructor(private userRepository: UserRepository) {
  }

  execute(getUsersRequest: GetUsersRequestModel): Observable<GetUsersResponseModel> {
    return this.userRepository.getUsers(getUsersRequest);
  }
}
