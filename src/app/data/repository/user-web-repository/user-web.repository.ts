import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {UserRepository} from '../../../core/repositories/user.repository';
import {GetUsersRequestModel} from '../../../core/domain/get-users-request.model';
import {GetUsersResponseModel} from '../../../core/domain/get-users-response.model';
import {UserModel} from '../../../core/domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserWebRepository extends UserRepository {

  constructor(
    private http: HttpClient) {
    super();
  }

  getUsers(getUsersRequest: GetUsersRequestModel): Observable<GetUsersResponseModel> {
    const url = `${environment.apiUrl}/users`;

    let httpParams = new HttpParams()
      .set('page', getUsersRequest.page.toString())
      .set('pageSize', getUsersRequest.pageSize.toString());
    getUsersRequest.sort.forEach(value => httpParams = httpParams.append('sort', value));

    return this.http.get<UserModel[]>(url, {params: httpParams, observe: 'response'}).pipe(
      map((response) => {
          // Retrieve header
          // const Link = this.parseLinkHeader(response.headers.get('Link'));

          const getUsersResponse = {
            users: response.body,
            paginationTotal: Number(response.headers.get('Pagination-Total')),
            nextPage: null,
            lastPage: null
          } as GetUsersResponseModel;
          return getUsersResponse;
        }
      ));
  }

  private parseLinkHeader(header) {
    if (header.length === 0) {
      return;
    }

    const parts = header.split(',');
    const links = {};
    parts.forEach(p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    return links;
  }
}
