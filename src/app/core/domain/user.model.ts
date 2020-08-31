export type Role = 'citizen' | 'staff';

export interface UserModel {
  // A globally unique identifier of the user
  readonly id: string;
  // A hyperlink reference to the user
  readonly href: string;
  // The globally unique username or the user
  name: string;
  // The user's password (readonly)
  password?: string;
  // The user's first name
  firstname: string;
  // The user's last name
  lastname: string;
  // An optional phone number for the user
  phone?: string;
  // An array of the user's roles (this defines what API operations the user will be authorized to perform)
  roles: Role[];
}
