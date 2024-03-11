import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Users } from './users.model';
import { JsonPipe } from '@angular/common';
import { json } from 'stream/consumers';
import { JSDocComment } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  endpoint = 'http://localhost:8081';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  registerUsers(data:any): Observable<Users> {
    return this.httpClient
      .post<Users>(this.endpoint + '/register?users='+data 
      ,data,
      this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleUser(id: any): Observable<Users> {
    return this.httpClient
      .get<Users>(this.endpoint + '/users/' + id)
      .pipe(retry(1), catchError(this.processError));
  }
  addUser(data: any): Observable<Users> {
    return this.httpClient
      .post<Users>(
        this.endpoint + '/users',
        data,
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  updateUser(id: any, data: any): Observable<Users> {
    return this.httpClient
      .put<Users>(
        this.endpoint + '/users/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  deleteUser(id: any) {
    return this.httpClient
      .delete<Users>(this.endpoint + '/users/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}