import { Component, OnInit } from '@angular/core';

import { Board } from '../model/board.model';
import { BoardService } from '../service/board.service';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
  providers: [BoardService, WebSocketService]
})
export class BoardsComponent implements OnInit {

  private boards: Array<Board>;

  constructor(private boardService: BoardService, private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.loadBoards();
  }

  private loadBoards(): void {
    this.boardService.loadBoards().subscribe(boardsResponse => {
      this.boards = boardsResponse;

      this.openSocketConnection();
    });
  }

  private openSocketConnection() {
    // tslint:disable-next-line:prefer-const
    let stompClient = this.webSocketService.connect();

    stompClient.connect({}, frame => {
      stompClient.subscribe('/topic/updates', updatedBoards => {
        this.boards = JSON.parse(updatedBoards.body);
      });
    });
  }
}
