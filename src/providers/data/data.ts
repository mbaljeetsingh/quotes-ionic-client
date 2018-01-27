import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getData(url) {
    return this.http.get(url);
  }

  postData(url, data) {
    console.log(url, data);

    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });

    return this.http.post(url, data, {headers: headers});
  }

  updateData(url, data) {
    console.log(url, data);

    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });

    return this.http.put(url, data, {headers: headers});
  }

  deleteData(url) {
    return this.http.delete(url);
  }

}
