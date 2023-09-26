import { TicTacToeGameService } from './tic-tac-toe-game.service';

describe('TicTacToeGameService', () => {
  let service: TicTacToeGameService;

  beforeEach(() => {
    service = new TicTacToeGameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array with two players', () => {
    const players = service.getPlayers();

    expect(players.length).toBe(2);
  });

  it('should have "X" as the tile for the first player', () => {
    const players = service.getPlayers();

    expect(players[0].tile).toBe('X');
  });

  it('should have "O" as the tile for the second player', () => {
    const players = service.getPlayers();

    expect(players[1].tile).toBe('O');
  });
});
