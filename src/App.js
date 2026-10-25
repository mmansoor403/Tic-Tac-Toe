import React, { useEffect, useReducer, useState } from "react";
import { GameBoard, GameControls, MoveHistory, Scoreboard } from "./components";
import "./App.css";

import {
  checkWinner,
  isDraw,
  isValidMove,
  getComputerMove,
} from "./utils/gameLogic";

const createInitialGame = () => ({
  board: Array(9).fill(null),
  currentPlayer: "X",
  moves: [],
  winner: null,
  winningCells: [],
  isDraw: false,
  isGameOver: false,
});

export function gameReducer(state, action) {
  switch (action.type) {
    case "MAKE_MOVE": {
      const { index, player } = action;

      if (
        state.isGameOver ||
        state.currentPlayer !== player ||
        !isValidMove(state.board, index)
      ) {
        return state;
      }

      const board = [...state.board];
      board[index] = player;

      const result = checkWinner(board);
      const draw = !result.winner && isDraw(board);

      const move = {
        id: `${state.moves.length + 1}-${index}-${player}`,
        number: state.moves.length + 1,
        player,
        row: Math.floor(index / 3) + 1,
        column: (index % 3) + 1,
        index,
      };

      return {
        board,
        currentPlayer:
          result.winner || draw ? player : player === "X" ? "O" : "X",
        moves: [...state.moves, move],
        winner: result.winner,
        winningCells: result.winningCells,
        isDraw: draw,
        isGameOver: Boolean(result.winner || draw),
      };
    }

    case "UNDO_MOVE": {
      const count = action.count || 1;

      if (state.moves.length === 0) return state;

      const moves = state.moves.slice(0, -count);
      const board = Array(9).fill(null);

      moves.forEach((move) => {
        board[move.index] = move.player;
      });

      const result = checkWinner(board);
      const draw = !result.winner && isDraw(board);

      return {
        board,
        currentPlayer: moves.length % 2 === 0 ? "X" : "O",
        moves,
        winner: result.winner,
        winningCells: result.winningCells,
        isDraw: draw,
        isGameOver: Boolean(result.winner || draw),
      };
    }

    case "RESET_GAME":
      return createInitialGame();

    default:
      return state;
  }
}

function App() {
  const [game, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGame,
  );

  const [mode, setMode] = useState("twoPlayer");

  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    draws: 0,
  });

  const [countedResult, setCountedResult] = useState(null);

  const {
    board,
    currentPlayer,
    moves,
    winner,
    winningCells,
    isDraw: gameIsDraw,
    isGameOver,
  } = game;

  useEffect(() => {
    if (!isGameOver || countedResult === moves.length) return;

    if (winner) {
      setScores((previous) => ({
        ...previous,
        [winner]: previous[winner] + 1,
      }));
    } else if (gameIsDraw) {
      setScores((previous) => ({
        ...previous,
        draws: previous.draws + 1,
      }));
    }

    setCountedResult(moves.length);
  }, [isGameOver, winner, gameIsDraw, moves.length, countedResult]);

  useEffect(() => {
    if (mode !== "computer" || currentPlayer !== "O" || isGameOver) {
      return;
    }

    const timer = setTimeout(() => {
      const index = getComputerMove(board);

      if (index !== -1) {
        dispatch({ type: "MAKE_MOVE", index, player: "O" });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [mode, currentPlayer, isGameOver, board]);

  function handleCellClick(index) {
    if (mode === "computer" && currentPlayer !== "X") return;

    dispatch({
      type: "MAKE_MOVE",
      index,
      player: currentPlayer,
    });
  }

  function handleUndo() {
    if (moves.length === 0) return;

    // If the game has ended, reverse its scoreboard result.
    if (isGameOver) {
      if (winner) {
        setScores((previous) => ({
          ...previous,
          [winner]: Math.max(0, previous[winner] - 1),
        }));
      } else if (gameIsDraw) {
        setScores((previous) => ({
          ...previous,
          draws: Math.max(0, previous.draws - 1),
        }));
      }
    }

    // In computer mode, undo both the computer's move
    // and the preceding human move when possible.
    const undoCount =
      mode === "computer" && moves[moves.length - 1].player === "O" ? 2 : 1;

    const actualCount = Math.min(undoCount, moves.length);

    dispatch({ type: "UNDO_MOVE", count: actualCount });
    setCountedResult(null);
  }

  function handleResetGame() {
    dispatch({ type: "RESET_GAME" });
    setCountedResult(null);
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    dispatch({ type: "RESET_GAME" });
    setCountedResult(null);
  }

  function handleResetScoreboard() {
    setScores({ X: 0, O: 0, draws: 0 });
  }

  const statusMessage = winner
    ? `${winner} wins!`
    : gameIsDraw
      ? "It's a draw!"
      : mode === "computer" && currentPlayer === "O"
        ? "Computer is thinking..."
        : `Player ${currentPlayer}'s turn`;

  return (
    <main className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
        <p>Play a friend or challenge the computer.</p>
      </header>

      <section className="game-status" aria-live="polite">
        <span className="status-label">
          {isGameOver ? "Game Over" : "Current Turn"}
        </span>
        <h2>{statusMessage}</h2>
      </section>

      <div className="game-layout">
        <section className="panel board-panel">
          <GameBoard
            board={board}
            winningCells={winningCells}
            disabled={
              isGameOver || (mode === "computer" && currentPlayer === "O")
            }
            onCellClick={handleCellClick}
          />
        </section>

        <aside className="side-panel">
          <section className="panel">
            <GameControls
              mode={mode}
              onModeChange={handleModeChange}
              onUndo={handleUndo}
              onResetGame={handleResetGame}
              onResetScoreboard={handleResetScoreboard}
              canUndo={moves.length > 0}
            />
          </section>

          <section className="panel">
            <Scoreboard scores={scores} />
          </section>

          <section className="panel">
            <MoveHistory moves={moves} />
          </section>
        </aside>
      </div>

      <footer className="app-footer">
        <p>Take your time. Think your next move through.</p>
      </footer>
    </main>
  );
}

export default App;
