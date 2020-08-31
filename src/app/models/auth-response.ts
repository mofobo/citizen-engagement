import {UserModel} from '../core/domain/user.model';

export class AuthResponse {
  token: string;
  user: UserModel;
}
