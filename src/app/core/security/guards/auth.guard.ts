import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IsAuthenticatedUsecase} from '../../usecases/is-authenticated.usecase';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private isAuthenticatedUsecase: IsAuthenticatedUsecase, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return (
      this.isAuthenticatedUsecase.execute()
        // If they're authenticated, return true, otherwise, returns an UrlTree to redirect to the login page
        .pipe(map((auth) => (auth ? true : this.router.parseUrl('/login'))))
    );
  }
}
