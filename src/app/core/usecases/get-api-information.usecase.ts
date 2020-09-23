import {Injectable} from '@angular/core';
import {UseCase} from '../base/use-case';
import {Observable} from 'rxjs';
import {ApiInformationRepository} from '../repositories/api-information.repository';
import {GetApiInformationResponseModel} from '../domain/get-api-information-response.model';

@Injectable({
  providedIn: 'root'
})
export class GetApiInformationUsecase implements UseCase<void, GetApiInformationResponseModel> {

  constructor(private apiInformationRepository: ApiInformationRepository) {
  }

  execute(): Observable<GetApiInformationResponseModel> {
    return this.apiInformationRepository.getApiInformation();
  }
}
