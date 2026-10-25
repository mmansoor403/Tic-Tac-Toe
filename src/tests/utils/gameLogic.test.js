import {
  checkWinner,
  isDraw,
  isValidMove,
  getComputerMove,
} from "../../utils/gameLogic";

test("detects a winning row for X", () => {
  const board = ["X", "X", "X", "O", "O", null, null, null, null];

  expect(checkWinner(board)).toEqual({
    winner: "X",
    winningCells: [0, 1, 2],
  });
});

test("detects a draw", () => {
  const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

  expect(isDraw(board)).toBe(true);
});

test("rejects an occupied cell", () => {
  const board = ["X", null, null, null, null, null, null, null, null];

  expect(isValidMove(board, 0)).toBe(false);
  expect(isValidMove(board, 1)).toBe(true);
});

test("computer takes a winning move before other priorities", () => {
  const board = ["O", "O", null, "X", "X", null, null, null, null];

  expect(getComputerMove(board)).toBe(2);
});

test("computer blocks an immediate win by X", () => {
  const board = ["X", "X", null, null, "O", null, null, null, null];

  expect(getComputerMove(board)).toBe(2);
});

test("computer takes center when available", () => {
  const board = ["X", null, null, null, null, null, null, null, null];

  expect(getComputerMove(board)).toBe(4);
});

test("returns -1 when the board already has a winner", () => {
  const board = ["X", "X", "X", "O", "O", null, null, null, null];

  expect(getComputerMove(board)).toBe(-1);
});

test("returns -1 when the board is a draw", () => {
  const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

  expect(getComputerMove(board)).toBe(-1);
});

test("chooses an available corner when center is occupied", () => {
  const board = [null, "X", null, null, "O", null, null, null, "X"];

  expect([0, 2, 6, 8]).toContain(getComputerMove(board));
});

test("chooses an available edge when center and corners are occupied", () => {
  const board = ["X", null, "O", null, "O", null, "X", null, "X"];

  expect([1, 3, 5, 7]).toContain(getComputerMove(board));
});
