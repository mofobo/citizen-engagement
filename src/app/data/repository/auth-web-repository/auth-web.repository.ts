import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthRepository} from '../../../core/repositories/auth.repository';
import {AuthResponseModel} from '../../../core/domain/auth-response.model';
import {AuthRequestModel} from '../../../core/domain/auth-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthWebRepository extends AuthRepository {

  constructor(
    private http: HttpClient) {
    super();
  }


  login(authRequest: AuthRequestModel): Observable<AuthResponseModel> {
    const url = `${environment.apiUrl}/auth`;
    return this.http.post<AuthResponseModel>(url, authRequest);
  }
}
