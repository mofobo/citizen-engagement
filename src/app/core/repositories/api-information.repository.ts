import {Observable} from 'rxjs';
import {GetApiInformationResponseModel} from '../domain/get-api-information-response.model';

export abstract class ApiInformationRepository {
  abstract getApiInformation(): Observable<GetApiInformationResponseModel>;
}
