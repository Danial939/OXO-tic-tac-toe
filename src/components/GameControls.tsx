import React from 'react';
import { GameMode, Difficulty } from '../types';
import { RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onModeSelect: (mode: GameMode) => void;
  onDifficultySelect: (difficulty: Difficulty) => void;
  onReset: () => void;
  onResetScores: () => void;
  gameMode: GameMode;
  difficulty: Difficulty;
}

const GameControls: React.FC<GameControlsProps> = ({
  onModeSelect,
  onDifficultySelect,
  onReset,
  onResetScores,
  gameMode,
  difficulty,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-4">
        <button
          onClick={() => onModeSelect('ai')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
            ${
              gameMode === 'ai'
                ? 'bg-gradient text-white shadow-lg'
                : 'bg-white/80 hover:bg-white text-gray-700 hover:shadow-md'
            }`}
        >
          AI
        </button>
        <button
          onClick={() => onModeSelect('multiplayer')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
            ${
              gameMode === 'multiplayer'
                ? 'bg-gradient text-white shadow-lg'
                : 'bg-white/80 hover:bg-white text-gray-700 hover:shadow-md'
            }`}
        >
          2 Игрока
        </button>
      </div>

      {gameMode === 'ai' && (
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultySelect(level)}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold capitalize transition-all duration-300 transform hover:scale-105
                ${
                  difficulty === level
                    ? 'bg-gradient text-white shadow-lg'
                    : 'bg-white/80 hover:bg-white text-gray-700 hover:shadow-md'
                }`}
            >
              {level}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-6 bg-gradient from-rose-500 to-pink-600 text-white rounded-xl font-semibold
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
         Новая игра
        </button>
        <button
          onClick={onResetScores}
          className="p-3 bg-gradient from-amber-500 to-orange-600 text-white rounded-xl
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          title="Сбросить результаты"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default GameControls;