import { Board, Cell, Player } from '../types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

export const checkWinner = (board: Board): { winner: Player | 'draw' | null; combination: number[] | null } => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, combination };
    }
  }

  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', combination: null };
  }

  return { winner: null, combination: null };
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
};


export const getRandomMove = (board: Board): number => {
  const availableMoves = getAvailableMoves(board);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

export const getMediumMove = (board: Board, player: Player): number => {
  const availableMoves = getAvailableMoves(board);
  
 
  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = player;
    if (checkWinner(newBoard).winner === player) {
      return move;
    }
  }

  
  const opponent = player === 'X' ? 'O' : 'X';
  for (const move of availableMoves) {
    const newBoard = [...board];
    newBoard[move] = opponent;
    if (checkWinner(newBoard).winner === opponent) {
      return move;
    }
  }


  if (board[4] === null) return 4;

  
  return getRandomMove(board);
};

export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  player: Player,
  opponent: Player
): { score: number; move?: number } => {
  const result = checkWinner(board).winner;

  if (result === player) return { score: 10 - depth };
  if (result === opponent) return { score: depth - 10 };
  if (result === 'draw') return { score: 0 };

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove;

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = player;
      const score = minimax(newBoard, depth + 1, false, player, opponent).score;
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove;

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = opponent;
      const score = minimax(newBoard, depth + 1, true, player, opponent).score;
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { score: bestScore, move: bestMove };
  }
};

export const getHardMove = (board: Board, player: Player): number => {
  const opponent = player === 'X' ? 'O' : 'X';
  const result = minimax(board, 0, true, player, opponent);
  return result.move!;
};