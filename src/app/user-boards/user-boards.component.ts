import { isUndefined, isNullOrUndefined } from 'util';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BoardService } from '../service/board.service';
import { Board } from '../model/board.model';
import { OK } from '../model/httpStatus';

@Component({
  selector: 'app-user-boards',
  templateUrl: './user-boards.component.html',
  styleUrls: ['./user-boards.component.css'],
  providers: [BoardService]
})
export class UserBoardsComponent implements OnInit {

  private username: string;
  private boards: Array<Board> = new Array<Board>();
  private boardToRemove: Board;

  private term: string;
  private boardsSearch: Array<Board> = new Array<Board>();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private boardService: BoardService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.loadUserBoards(this.username);
    });
  }

  /**
   * Se obtienen los boards a traves del nombre de usuario que viene por parametro
   * @param username
   */
  public loadUserBoards(username: string): void {
    this.boardService.loadUserBoards(this.username).subscribe(boardsResponse => {
      this.boards = boardsResponse;
    });
  }

  /**
	 * Confirmamos el board a remover
	 * @param modalConfirmRemove
	 * @param board
	 */
  public confirmRemove(modalConfirmRemove, board): void {
    this.boardToRemove = board;
    this.modalService.open(modalConfirmRemove, { centered : true }).result.then((result) => {
      this.boardService.removeBoard(this.username, this.boardToRemove.id)
        .then(() => { this.boards = this.boards.filter(removedBoard => removedBoard.id !== this.boardToRemove.id); });
    }, (reason) => {} );
  }

  public search(term): void {
    if ( term !== undefined && term !== '' ) {
      this.boardService.boardsByTerm(term).subscribe(response => {
        this.boardsSearch = response;
      });
    }
  }

  public addBoard(boardSearch): void {
    this.boardService.addBoard(this.username, boardSearch).subscribe(restResponse => {
      if (restResponse.responseCode === OK) {
        this.loadUserBoards(this.username);
      }
    });
  }

  public inUserBoards(boardSearch): boolean {
    return !isNullOrUndefined( this.boards.find( board => board.woeid === boardSearch.woeid ) );
  }

}
