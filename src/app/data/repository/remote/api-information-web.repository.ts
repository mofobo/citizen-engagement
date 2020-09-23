import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ApiInformationRepository} from '../../../core/repositories/api-information.repository';
import {GetApiInformationResponseModel} from '../../../core/domain/get-api-information-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiInformationWebRepository extends ApiInformationRepository {

  constructor(
    private http: HttpClient) {
    super();
  }

  getApiInformation(): Observable<GetApiInformationResponseModel> {
    const url = `${environment.apiUrl}`;
    return this.http.get<GetApiInformationResponseModel>(url);
  }
}
