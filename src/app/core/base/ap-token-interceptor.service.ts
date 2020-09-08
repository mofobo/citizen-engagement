import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import {GetTokenUsecase} from '../usecases/get-token.usecase';

@Injectable({
  providedIn: 'root',
})
export class ApiTokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve AuthService on method invocation from the Angular injector.
    // (Otherwise there would be a circular dependency:
    //  AuthInterceptorProvider -> AuthService -> HttpClient -> AuthInterceptorProvider).
    const getTokenUsecase = this.injector.get(GetTokenUsecase);

    // Get the auth token, if any
    return getTokenUsecase.execute().pipe(
      first(),
      switchMap((token) => {
        // If the token exists and the header does not...
        if (token && !req.headers.has('Authorization')) {
          // Clone the actual request and add it the header
          req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
        }
        // Process this updated request
        return next.handle(req);
      })
    );
  }
}
