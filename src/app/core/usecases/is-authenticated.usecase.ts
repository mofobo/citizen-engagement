import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {LocalStorageRepository} from '../repositories/local-storage.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedUsecase implements UseCase<void, boolean> {

  constructor(private localstorageRepository: LocalStorageRepository) {
  }

  execute(params: void): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      subscriber.next(Boolean(this.localstorageRepository.getAuthResponse()));
      subscriber.complete();
    });
  }
}
