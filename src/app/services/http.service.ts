import { Injectable } from '@angular/core';
import {Http,URLSearchParams,RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpService {

  private token = environment.apimedic.token;

  constructor(private  http: Http) { }

  get(url, parameters = new URLSearchParams()) {
    parameters.append('token', this.token);
    parameters.append('language', 'en-gb');
    parameters.append('format', 'json');
    let options = new RequestOptions({ params: parameters });
    return this.http.get(url, options);
  }

}
