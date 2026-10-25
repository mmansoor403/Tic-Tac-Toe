import React from "react";
import "./styles.css";

function GameBoard({ board, winningCells, disabled, onCellClick }) {
  return (
    <div className="game-board">
      {board.map((cell, index) => {
        const isWinningCell = winningCells.includes(index);

        return (
          <button
            key={index}
            className={`game-cell ${isWinningCell ? "winning-cell" : ""}`}
            onClick={() => onCellClick(index)}
            disabled={disabled || cell !== null}
            aria-label={`Row ${Math.floor(index / 3) + 1}, Column ${(index % 3) + 1}${cell ? `, ${cell}` : ""}`}
          >
            {cell}
          </button>
        );
      })}
    </div>
  );
}

export default GameBoard;
