import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Board } from '../model/board.model';

const url = 'http://localhost:8080/boards';

@Injectable()
export class BoardService {

  constructor(private http: HttpClient) { }

  /**
   * Obtenemos los boards
   */
  public loadBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(url);
  }

  /**
   * Obtenemos los boards de un usuario en base a su username
   * @param username
   */
  public loadUserBoards(username: string): Observable<Board[]> {
    return this.http.get<Board[]>(url + '/' + username);
  }

}
