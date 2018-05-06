import { Component, OnInit } from '@angular/core';

import { Board } from '../model/board.model';
import { BoardService } from '../service/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
  providers: [BoardService]
})
export class BoardsComponent implements OnInit {

  private boards: Array<Board>;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.loadBoards();
  }

  private loadBoards(): void {
    this.boardService.loadBoards().subscribe(boardsResponse => {
      this.boards = boardsResponse;
    });
  }
}
