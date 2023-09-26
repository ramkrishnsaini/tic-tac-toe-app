import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player } from '../model/Player';
import { TicTacToeGameService } from '../services/tic-tac-toe-game.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TicTacToeComponent {
  // constructor(private ticTacToeGameService: TicTacToeGameService) { }

  currentPlayer: Player | null = null;
  players: Player[] = [];
  board: (Player | null)[][] = [[null, null, null], [null, null, null], [null, null, null]];
  winner: Player | null = null;

  constructor(private ticTacToeGameService: TicTacToeGameService) { }

  ngOnInit() {
    this.players = this.ticTacToeGameService.getPlayers();
    this.currentPlayer = this.players[0];
  }

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner();
      this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  }

  checkWinner() {
    console.log('this.board>>', this.board);
    console.log('this.currentPlayer>>', this.currentPlayer);
    // ... game-winning logic
    // Check rows for a win
    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] === this.currentPlayer &&
        this.board[row][1] === this.currentPlayer &&
        this.board[row][2] === this.currentPlayer
      ) {
        this.winner = this.currentPlayer;
        return;
      }
    }

    // Check columns for a win
    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] === this.currentPlayer &&
        this.board[1][col] === this.currentPlayer &&
        this.board[2][col] === this.currentPlayer
      ) {
        this.winner = this.currentPlayer;
        return;
      }
    }

    // Check diagonals for a win
    if (
      (this.board[0][0] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer) ||
      (this.board[0][2] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][0] === this.currentPlayer)
    ) {
      this.winner = this.currentPlayer;
      return;
    }

    // Check for a tie
    if (this.board.flat().every((cell) => cell !== null) && !this.winner) {
      this.winner = { tile: 'Tie' }; // Use a special player to represent a tie
    }
  }

  isTie(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== null)) && !this.winner;
  }

  resetGame() {
    this.currentPlayer = this.players[0];
    this.board = [[null, null, null], [null, null, null], [null, null, null]];
    this.winner = null;
  }


  public getPlayers(): Player[] {
    return this.ticTacToeGameService.getPlayers();
  }

}
