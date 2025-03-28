import React from 'react';
import { Cell as CellType } from '../types';
import { X, Circle } from 'lucide-react';

interface CellProps {
  value: CellType;
  onClick: () => void;
  isWinning: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinning }) => {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-24 rounded-xl flex items-center justify-center
        transition-all duration-300 transform hover:scale-105
        ${isWinning ? 'bg-gradient animate-glow' : 'cell-gradient'}
        ${value ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
      disabled={!!value}
    >
      {value === 'X' && (
        <X
          className={`w-16 h-16 animate-scale-in
            ${isWinning ? 'text-white' : 'text-indigo-600'}`}
          strokeWidth={3}
        />
      )}
      {value === 'O' && (
        <Circle
          className={`w-16 h-16 animate-scale-in
            ${isWinning ? 'text-white' : 'text-purple-600'}`}
          strokeWidth={3}
        />
      )}
    </button>
  );
};

export default Cell;