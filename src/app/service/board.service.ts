import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Board } from '../model/board.model';
import { RestResponse } from '../model/restResponse.model';

const url = 'http://localhost:8080/boards';

@Injectable()
export class BoardService {

  public degreeUnits: String = 'F';

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

  /**
   * Se guarda la asociacion entre usuario y board
   * @param username
   * @param board
   */
  public addBoard(username: string, board: Board): Observable<RestResponse> {
    return this.http.post<RestResponse>(url + '/' + username, board);
  }

  /**
   * Eliminamos la relacion entre usuario y board
   * @param username
   * @param board
   */
  public removeBoard(username: string, board: number): Promise<void> {
    const urlDelete = url + '/' + username + '/' + board;

    return this.http.delete(urlDelete, { headers: new HttpHeaders({'Content-Type': 'application/json'}) })
      .toPromise()
      .then(() => null);
  }

  /**
   * Buscamos boards en base a nombre de ciudad, localidad o pais
   * @param term
   */
  public boardsByTerm(term: string): Observable<Board[]> {
    return this.http.get<Board[]>(url + '/location/' + term);
  }

  /**
   * Mostramos la temperatura dependiendo de la unidad de medida
   * @param temperature
   * @param generalDegreeUnit
   */
  public toggleTempByDegreeUnits(temperature: number): string {
    if ( this.degreeUnits === 'C' ) {
      // tslint:disable-next-line:prefer-const
      let temp = (temperature - 32) * 5 / 9;

      return Math.round(temp) + '° C';
    } else {
      return temperature + '° F';
    }
  }

}
