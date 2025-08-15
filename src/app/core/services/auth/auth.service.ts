import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Auth } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly _HttpClient: HttpClient,
    private _Router: Router
  ) {}
  userToken: BehaviorSubject<any> = new BehaviorSubject(null);
  setUserToken(): void {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.userToken.next(token);
    }
  }
  handleRegister(userInfo: Auth): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}signUp`, userInfo);
  }
  handleLogin(userInfo: Auth): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}signIn`, userInfo);
  }
  logOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/signin']);
  }
}
