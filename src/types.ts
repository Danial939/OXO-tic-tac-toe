export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameMode = 'ai' | 'multiplayer';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  scores: {
    X: number;
    O: number;
  };
  gameMode: GameMode;
  difficulty: Difficulty;
  winningCombination: number[] | null;
}