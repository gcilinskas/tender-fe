import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {CacheableObservable, clearCache} from './cacheable-observable/cacheable-observable.model';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    get(path, params?, responseType?, headers?): CacheableObservable<any> {
        const httpResponseObservable = this.request('GET', path, params, null, headers, responseType);

        return CacheableObservable.create(httpResponseObservable, path);
    }

    post(path, body, params?, headers?): Observable<any> {
        return this.request('POST', path, params, body, headers);
    }

    delete(path, body, params?): Observable<any> {
        return this.request('DELETE', path, params, body);
    }

    patch(path, body, params?): Observable<any> {
        return this.request('PATCH', path, params, body);
    }

    private request(method, path, params?, body?, headers?: HttpHeaders, responseType?) {
        headers = new HttpHeaders();
        headers.set( 'Access-Control-Allow-Origin', '*');
        return this.http.request(method, environment.api + path, { params, body, headers, responseType }).pipe(
            map(
                res => {
                    return res;
                },
                err => {
                    this.handleError(err);
                    return err;
                }
            )
        );
    }

    private handleError(error) {
        /* Error handling is supposed to be here */
        return error;
    }

    clearCache() {
        clearCache();
    }
}
