import { Injectable } from '@angular/core';
import { IUser, IUserReg} from '../models/user';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { API } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 
  private userStorage:IUser[]=[];
  private currentUser: IUser | null = null;

  constructor(private http:HttpClient) {}

  private getUser(login:string): IUser|null {
    return this.userStorage.find((user)=> login === user.login ) ||null;
  }

  addUser(user:IUser,isRememberMe?:boolean): true | string {
    if (this.getUser(user.login)) {
      return 'user already exists'
    }
    this.userStorage.push(user);
    return true;
  }

  checkUser(login:string):boolean{
    return !!this.getUser(login)
  }
  
  registerUser  (user:IUserReg): void {
     this.http.post(API.reg, user).subscribe();
  }
 

  authUser(user: IUser):void {
    this.http.post(API.desauth,user).subscribe();
  }

  
}
