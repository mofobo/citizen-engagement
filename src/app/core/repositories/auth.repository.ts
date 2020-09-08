import {Observable} from 'rxjs';
import {AuthResponseModel} from '../domain/auth-response.model';
import {AuthRequestModel} from '../domain/auth-request.model';

export abstract class AuthRepository {
  abstract login(authRequest: AuthRequestModel): Observable<AuthResponseModel>;
}
