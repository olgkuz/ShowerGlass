

export interface IUser {
  login: string;
  password?: string;  
  email?: string;
  id?: string;        
}

export interface IUserReg {
  login: string;
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string;
  user: {
    id: string;
    login: string;
    email?: string;
  };
}

export interface UserStorage {
  login: string;
  email?: string;
  id?: string;
}