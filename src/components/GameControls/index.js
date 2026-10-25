import React from "react";
import "./styles.css";

function GameControls({
  mode,
  onModeChange,
  onUndo,
  onResetGame,
  onResetScoreboard,
  canUndo,
}) {
  return (
    <section className="game-controls">
      <div className="mode-selector">
        <label htmlFor="game-mode">Game Mode</label>
        <select
          id="game-mode"
          value={mode}
          onChange={(event) => onModeChange(event.target.value)}
        >
          <option value="twoPlayer">Two Player Mode</option>
          <option value="computer">Play Against Computer</option>
        </select>
      </div>

      <div className="control-buttons">
        <button
          type="button"
          className="control-button undo-button"
          onClick={onUndo}
          disabled={!canUndo}
        >
          Undo Last Move
        </button>

        <button
          type="button"
          className="control-button reset-button"
          onClick={onResetGame}
        >
          Reset Game
        </button>

        <button
          type="button"
          className="control-button scoreboard-reset-button"
          onClick={onResetScoreboard}
        >
          Reset Scoreboard
        </button>
      </div>
    </section>
  );
}

export default GameControls;
