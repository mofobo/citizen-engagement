import {AuthResponseModel} from '../domain/auth-response.model';

export abstract class LocalStorageRepository {
  abstract setAuthResponse(authResponse: AuthResponseModel): void;
  abstract getAuthResponse(): AuthResponseModel;
  abstract getToken(): string;
  abstract removeAuthResponse(): void;
}
