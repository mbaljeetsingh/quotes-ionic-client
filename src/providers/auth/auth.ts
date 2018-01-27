import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../envrionments/environment';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(data){
    console.log(data);

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.post(`${environment.api_url}/api/Users/login`, data, {headers: headers});
  }

  logout(user){
    const accessToken =user.id;

    return this.http.post(`${environment.api_url}/api/Users/logout?access_token=${accessToken}`, {});
  }

}
