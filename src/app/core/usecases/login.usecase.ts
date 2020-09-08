import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {AuthRequestModel} from '../domain/auth-request.model';
import {AuthResponseModel} from '../domain/auth-response.model';
import {AuthRepository} from '../repositories/auth.repository';
import {LocalStorageRepository} from '../repositories/local-storage.repository';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginUsecase implements UseCase<AuthRequestModel, AuthResponseModel> {

  constructor(
    private authRepository: AuthRepository,
    private localstorageRepository: LocalStorageRepository
  ) {
  }

  execute(params: AuthRequestModel): Observable<AuthResponseModel> {
    return this.authRepository
      .login(params)
      .pipe(tap((response) => this.localstorageRepository.setAuthResponse(response)));
  }
}
