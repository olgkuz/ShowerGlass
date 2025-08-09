export interface IUser {
  name: string;
  password?: string;
  email?: string;
  id?: string;
}

export interface IUserReg {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email?: string;
  };
}

export interface UserStorage {
  name: string;
  email?: string;
  id?: string;
}
