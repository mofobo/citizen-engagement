import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {LocalStorageRepository} from '../repositories/local-storage.repository';

@Injectable({
  providedIn: 'root'
})
export class GetTokenUsecase implements UseCase<void, string> {

  constructor(
    private localstorageRepository: LocalStorageRepository
  ) {
  }

  execute(params: void): Observable<string> {
    return new Observable(observer => {
      observer.next(this.localstorageRepository.getToken());
      observer.complete();
    });
  }
}
