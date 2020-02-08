import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SharedServices {

    private baseURL = environment.baseURL;

    constructor(private http: HttpClient) {}

    getInternalHttpRequest(url: any): Observable<any> {
        return this.http.get<any>(url)
               .pipe(
                   catchError(this.handleError)
               );
    }

    getHttpRequest(url: any): Observable<any> {
        return this.http.get<any>(this.baseURL + '/' + url)
               .pipe(
                   catchError(this.handleError)
               );
    }

    postHttpRequest(url: string, body: any): Observable<any> {
        // let headers = new HttpHeaders();

        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<any>(this.baseURL + '/' + url, JSON.stringify(body), {headers: headers})
                .pipe(
                    catchError(this.handleError)
                );
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
            console.log(errorMessage);
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.log(errorMessage);
        }
       return throwError(errorMessage);
    }

}
