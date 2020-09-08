import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {AuthResponseModel} from '../domain/auth-response.model';
import {UserModel} from '../domain/user.model';
import {AuthRequestModel} from '../domain/auth-request.model';
import {environment} from '../../../environments/environment';

const STORAGE_KEY = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * A "ReplaySubject" is a Subject (a source of an Observable) that emits a predefined number of previously emitted
   * values to an Observer when it subscribes to it.
   * It will act as a sort of local "cache" for the AuthResponseModel object value.
   */
  private authenticated$: ReplaySubject<AuthResponseModel>;

  constructor(private http: HttpClient) {
    // Get the credentials from the localStorage when the AuthService is created
    // It will either contains an AuthResponseModel object of null if it does not exist
    const savedAuth = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) as AuthResponseModel;
    this.authenticated$ = new ReplaySubject(1);
    // Emit the savedAuth as the initial value for the ReplaySubject
    this.authenticated$.next(savedAuth);
  }

  /**
   * Checks if the user is authenticated by casting the latest AuthResponseModel value as a boolean
   */
  isAuthenticated(): Observable<boolean> {
    return this.authenticated$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * Retrieves the User object from the latest AuthResponseModel value
   */
  getUser(): Observable<UserModel> {
    return this.authenticated$.pipe(
      map((auth) => (auth ? auth.user : undefined))
    );
  }

  /**
   * Retrieves the token string from the latest AuthResponseModel value
   */
  getToken(): Observable<string> {
    return this.authenticated$.pipe(
      map((auth) => (auth ? auth.token : undefined))
    );
  }

  /**
   * Logs in a user with the provided AuthRequestModel object and emits the received AuthResponseModel if successful.
   */
  login(authRequest: AuthRequestModel): Observable<UserModel> {
    return this.http.post<AuthResponseModel>(`${environment.apiUrl}/auth`, authRequest).pipe(
      tap((response) => this.saveAuth(response)),
      map((response) => {
        this.authenticated$.next(response);
        console.log(`User ${response.user.name} logged in`);
        return response.user;
      })
    );
  }

  /**
   * Logs out a user and emit an empty AuthResponseModel
   */
  logout() {
    // Remove the AuthResponseModel from the localStorage when user logs out
    localStorage.removeItem(STORAGE_KEY);
    this.authenticated$.next(null);
    console.log('User logged out');
  }

  /**
   * Saves the AuthResponseModel in the localStorage
   */
  private saveAuth(auth: AuthResponseModel) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }
}
