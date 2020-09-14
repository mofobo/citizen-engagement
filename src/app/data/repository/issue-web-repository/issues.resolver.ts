import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class IssuesPaginationTotalResolver implements Resolve<number> {

  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    const url = `${environment.apiUrl}/issues`;
    return this.http.get(url, {observe: 'response'})
      .pipe(map(res => Number(res.headers.get('Pagination-Total'))));
  }
}
