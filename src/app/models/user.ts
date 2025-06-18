export interface IUser {
  login: string;
  password?: string;  //  не хранится на клиенте
  email?: string;
  id?: string;        //  хранения ID
}

export interface IUserReg {
  login: string;
  email: string;
  password: string;
}