import {UserModel} from './user.model';

export class AuthResponseModel {
  token: string;
  user: UserModel;
}
