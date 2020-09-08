import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {LocalStorageRepository} from '../repositories/local-storage.repository';
import {Observable} from 'rxjs';
import {AppSettings} from '../base/app-settings';

@Injectable({
  providedIn: 'root'
})
export class LogoutUsecase implements UseCase<void, void> {

  constructor(private localstorageRepository: LocalStorageRepository) {
  }

  execute(params: void): Observable<void> {
    return new Observable<void>(subscriber => {
      localStorage.removeItem(AppSettings.LOCALSTORAGE_AUTH_KEY);
    });
  }
}
