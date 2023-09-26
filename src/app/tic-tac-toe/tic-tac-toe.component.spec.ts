
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { TicTacToeGameService } from '../services/tic-tac-toe-game.service';
import { ChangeDetectionStrategy } from '@angular/core';

describe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;
  let gameService: TicTacToeGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicTacToeComponent],
      providers: [TicTacToeGameService],
    }).overrideComponent(TicTacToeComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(TicTacToeGameService);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the first player', () => {
    component.ngOnInit();
    expect(component.currentPlayer).toEqual(gameService.getPlayers()[0]);
  });

  it('should make a move when a cell is clicked', () => {
    const row = 0;
    const col = 0;
    spyOn(component, 'checkWinner'); // Mock the checkWinner function

    component.makeMove(row, col);

    expect(component.board[row][col]).toEqual(gameService.getPlayers()[0]);
    expect(component.checkWinner).toHaveBeenCalled();
  });

  it('should not make a move when a cell is already occupied', () => {
    const row = 0;
    const col = 0;
    spyOn(component, 'checkWinner'); // Mock the checkWinner function

    component.makeMove(row, col); // Player X makes the first move
    

    // Attempting to make a move in the same cell should not change the board
    const initialBoardState = JSON.parse(JSON.stringify(component.board));
    component.makeMove(row, col);

    expect(component.board).toEqual(initialBoardState);
    expect(component.checkWinner).toHaveBeenCalledTimes(1); // checkWinner should still be called once
  });

  it('should detect a win in a row', () => {
    // Arrange: Simulate a winning scenario in a row
    component.board = [
      [null, null, null],
      [gameService.getPlayers()[0], gameService.getPlayers()[0], gameService.getPlayers()[0]],
      [null, null, null],
    ];

    // Act
    component.checkWinner();

    // Assert: Player X should win
     
    expect(component.winner?.tile).toEqual(gameService.getPlayers()[0].tile);
  });


  it('should detect a win in a column', () => {
    // Arrange: Simulate a winning scenario in a column
    component.board = [[null, null, gameService.getPlayers()[0]], [null, null, gameService.getPlayers()[0]], [null, null, gameService.getPlayers()[0]]];

    // Act
    component.checkWinner();

    // Assert: Player X should win
    expect(component.winner?.tile).toEqual(gameService.getPlayers()[0].tile);
  });

  it('should detect a win in a diagonal', () => {
    // Arrange: Simulate a winning scenario in a diagonal
    component.board = [[null, null, gameService.getPlayers()[0]], [null, gameService.getPlayers()[0], null], [gameService.getPlayers()[0], null, null]];
     
    // Act
    component.checkWinner();

    // Assert: Player X should win
    expect(component.winner?.tile).toEqual(gameService.getPlayers()[0].tile);
  });

  it('should detect a tie', () => {
    // Arrange: Fill the board to simulate a tie
    component.board = [
      [gameService.getPlayers()[0], gameService.getPlayers()[1], gameService.getPlayers()[0]],
      [gameService.getPlayers()[0], gameService.getPlayers()[1], gameService.getPlayers()[0]],
      [gameService.getPlayers()[1], gameService.getPlayers()[0], gameService.getPlayers()[1]],
    ];

    // Act
    component.checkWinner();

    // Assert: There should be no winner
    expect(component.winner?.tile).toEqual('Tie');
  });
  it('should reset the game', () => {
    // Arrange: Simulate some moves and a winner
    component.board = [[null, null, gameService.getPlayers()[0]], [null, null, gameService.getPlayers()[0]], [null, null, gameService.getPlayers()[0]]];
    component.checkWinner();

    // Store the initial currentPlayer for comparison
    const initialPlayer = component.currentPlayer;

    // Act
    component.resetGame();

    // Assert: Game should be reset
    expect(component.currentPlayer?.tile).toEqual(initialPlayer?.tile);
    expect(component.board).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
    expect(component.winner).toBeNull();
  });

});
