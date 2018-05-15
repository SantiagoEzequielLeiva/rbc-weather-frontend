import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';

@Injectable()
export class WebSocketService {

  private urlSocketServer = 'http://localhost:8080/socket';

  /**
   * Establecemos la conexion con el socket / back-end
   */
  public connect() {
    // tslint:disable-next-line:prefer-const
    let socket = new SockJs(this.urlSocketServer);

    // tslint:disable-next-line:prefer-const
    let stompClient = Stomp.over(socket);

    return stompClient;
  }

}
