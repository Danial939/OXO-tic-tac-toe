import React, { useState, useEffect } from 'react';
import Cell from './components/Cell';
import GameControls from './components/GameControls';
import ScoreBoard from './components/ScoreBoard';
import { GameState, GameMode, Difficulty, Player } from './types';
import {
  checkWinner,
  getRandomMove,
  getMediumMove,
  getHardMove,
} from './utils/gameLogic';

const STORAGE_KEY = 'tic-tac-toe-state';

const INITIAL_STATE: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  scores: { X: 0, O: 0 },
  gameMode: 'ai',
  difficulty: 'medium',
  winningCombination: null,
};

function loadGameState(): GameState {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error('Не удалось проанализировать сохраненное состояние игры.:', error);
    }
  }
  return INITIAL_STATE;
}

function App() {
  const [gameState, setGameState] = useState<GameState>(loadGameState);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, combination } = checkWinner(newBoard);
    
    if (winner) {
      const newScores = { ...gameState.scores };
      if (winner !== 'draw') {
        newScores[winner]++;
      }
      
      setGameState((prev) => ({
        ...prev,
        board: newBoard,
        winner,
        scores: newScores,
        winningCombination: combination,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      }));
    }
  };

  const makeAIMove = () => {
    const { difficulty, board, currentPlayer } = gameState;
    let moveIndex: number;

    switch (difficulty) {
      case 'easy':
        moveIndex = getRandomMove(board);
        break;
      case 'medium':
        moveIndex = getMediumMove(board, currentPlayer);
        break;
      case 'hard':
        moveIndex = getHardMove(board, currentPlayer);
        break;
      default:
        moveIndex = getRandomMove(board);
    }

    setTimeout(() => handleCellClick(moveIndex), 500);
  };

  useEffect(() => {
    if (
      gameState.gameMode === 'ai' &&
      gameState.currentPlayer === 'O' &&
      !gameState.winner
    ) {
      makeAIMove();
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.winner]);

  const handleModeSelect = (mode: GameMode) => {
    setGameState({
      ...INITIAL_STATE,
      gameMode: mode,
      difficulty: gameState.difficulty,
      scores: gameState.scores,
    });
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setGameState({
      ...INITIAL_STATE,
      gameMode: gameState.gameMode,
      difficulty,
      scores: gameState.scores,
    });
  };

  const handleReset = () => {
    setGameState((prev) => ({
      ...INITIAL_STATE,
      gameMode: prev.gameMode,
      difficulty: prev.difficulty,
      scores: prev.scores,
    }));
  };

  const handleResetScores = () => {
    setGameState((prev) => ({
      ...prev,
      scores: { X: 0, O: 0 },
    }));
  };

  const getGameStatus = () => {
    if (gameState.winner === 'draw') {
      return "Это ничья!";
    }
    if (gameState.winner) {
      const winner =
        gameState.gameMode === 'ai'
          ? gameState.winner === 'X'
            ? 'Ты выиграл!'
            : 'AI выиграл!'
          : `Игрок ${gameState.winner} выиграл!`;
      return winner;
    }
    const currentPlayer =
      gameState.gameMode === 'ai'
        ? gameState.currentPlayer === 'X'
          ? 'Твой ход'
          : "Ход AI"
        : `Ход ${gameState.currentPlayer} игрока`;
    return currentPlayer;
  };

  return (
    <div className="min-h-screen bg-gradient flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/90 rounded-2xl shadow-2xl p-8 space-y-8">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent text-3xl font-bold mb-8">
          Крестики-нолики
        </h1>

        <ScoreBoard scores={gameState.scores} gameMode={gameState.gameMode} />

        <div className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-3xl font-semibold italic drop-shadow-[0_0_10px_#f0abfc] animate-[gradient_3s_ease_infinite] bg-[length:200%_200%] mb-4">
          {getGameStatus()}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {gameState.board.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => handleCellClick(index)}
              isWinning={gameState.winningCombination?.includes(index) || false}
            />
          ))}
        </div>

        <GameControls
          onModeSelect={handleModeSelect}
          onDifficultySelect={handleDifficultySelect}
          onReset={handleReset}
          onResetScores={handleResetScores}
          gameMode={gameState.gameMode}
          difficulty={gameState.difficulty}
        />
      </div>
    </div>
  );
}

export default App;