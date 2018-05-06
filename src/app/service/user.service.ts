import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { User } from '../model/user.model';

const url = 'http://localhost:8080/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Obtenemos los usuarios
   */
  public loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(url);
  }
}
