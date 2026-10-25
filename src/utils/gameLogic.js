export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Main diagonal
  [2, 4, 6], // Opposite diagonal
];

// Returns the winner and winning cell indexes.
export function checkWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCells: combination,
      };
    }
  }

  return {
    winner: null,
    winningCells: [],
  };
}

export function isDraw(board) {
  const { winner } = checkWinner(board);

  return !winner && board.every((cell) => cell !== null);
}

export function isValidMove(board, index) {
  return (
    Number.isInteger(index) &&
    index >= 0 &&
    index < board.length &&
    board[index] === null
  );
}

// Finds a cell that allows the given player to win immediately.
function findWinningMove(board, player) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== null) continue;

    const nextBoard = [...board];
    nextBoard[i] = player;

    if (checkWinner(nextBoard).winner === player) {
      return i;
    }
  }

  return -1;
}

// Computer plays as O.
export function getComputerMove(board) {
  if (checkWinner(board).winner || isDraw(board)) {
    return -1;
  }

  // 1. Win if O can win.
  const winningMove = findWinningMove(board, "O");
  if (winningMove !== -1) return winningMove;

  // 2. Block X if X can win.
  const blockingMove = findWinningMove(board, "X");
  if (blockingMove !== -1) return blockingMove;

  // 3. Take center.
  if (board[4] === null) return 4;

  // 4. Take an available corner.
  const corners = [0, 2, 6, 8];
  const availableCorner = corners.find((index) => board[index] === null);

  if (availableCorner !== undefined) return availableCorner;

  // 5. Take any available cell.
  return board.findIndex((cell) => cell === null);
}
