// src/app/models/user.ts

export interface IUser {
  login: string;
  password?: string;  // Опционально, так как не хранится на клиенте
  email?: string;
  id?: string;        // Для хранения ID
}

export interface IUserReg {
  login: string;
  email: string;
  password: string;
}

// Новые интерфейсы, вынесенные из UserService
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