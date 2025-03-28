import React from 'react';
import { GameMode, Player } from '../types';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
  };
  gameMode: GameMode;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, gameMode }) => {
  const getPlayerName = (player: Player) => {
    if (gameMode === 'multiplayer') {
      return `Player ${player}`;
    }
    return player === 'X' ? 'You' : 'AI';
  };

  return (
    <div className="flex justify-center gap-12 text-2xl font-bold">
      <div className="bg-white/80 rounded-xl px-6 py-3 text-indigo-600 shadow-lg">
        {getPlayerName('X')}: {scores.X}
      </div>
      <div className="bg-white/80 rounded-xl px-6 py-3 text-purple-600 shadow-lg">
        {getPlayerName('O')}: {scores.O}
      </div>
    </div>
  );
};

export default ScoreBoard;