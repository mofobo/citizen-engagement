import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponseModel} from '../../../core/domain/auth-response.model';
import {AppSettings} from '../../../core/base/app-settings';
import {LocalStorageRepository} from '../../../core/repositories/local-storage.repository';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageLocalRepository extends LocalStorageRepository {

  constructor(
    private http: HttpClient) {
    super();
  }

  getAuthResponse(): AuthResponseModel {
    return JSON.parse(
      localStorage.getItem(AppSettings.LOCALSTORAGE_AUTH_KEY)
    ) as AuthResponseModel;
  }

  setAuthResponse(authResponse: AuthResponseModel): void {
    localStorage.setItem(AppSettings.LOCALSTORAGE_AUTH_KEY, JSON.stringify(authResponse));
  }

  removeAuthResponse(): void {
    localStorage.removeItem(AppSettings.LOCALSTORAGE_AUTH_KEY);
  }

  getToken(): string {
    const authResponse = this.getAuthResponse();
    if (authResponse != null) {
      return authResponse.token;
    }
    return '';
  }
}
