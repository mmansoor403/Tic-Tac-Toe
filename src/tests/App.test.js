import { render, screen, fireEvent } from "@testing-library/react";
import App, { gameReducer } from "../App";

describe("Tic Tac Toe App", () => {
  test("renders the initial game state", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Tic Tac Toe" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Player X's turn")).toBeInTheDocument();

    expect(screen.getAllByRole("button")).toHaveLength(12);
  });

  test("places X and switches the turn to O", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Row 1, Column 1",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Row 1, Column 1, X",
      }),
    ).toHaveTextContent("X");

    expect(screen.getByText("Player O's turn")).toBeInTheDocument();
  });

  test("detects a win and updates the scoreboard", () => {
    render(<App />);

    const clickCell = (row, column) => {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Row ${row}, Column ${column}`,
        }),
      );
    };

    // X moves
    clickCell(1, 1);
    // O moves
    clickCell(2, 1);
    // X moves
    clickCell(1, 2);
    // O moves
    clickCell(2, 2);
    // X completes the winning row
    clickCell(1, 3);

    expect(screen.getByText("X wins!")).toBeInTheDocument();

    // Verify X's scoreboard count is 1
    const xWinsLabel = screen.getByText("X Wins");
    expect(xWinsLabel.parentElement).toHaveTextContent("1");
  });

  test("undoes a winning move and reverses the scoreboard", () => {
    render(<App />);

    const clickCell = (row, column) => {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Row ${row}, Column ${column}`,
        }),
      );
    };

    // Complete a winning game for X
    clickCell(1, 1); // X
    clickCell(2, 1); // O
    clickCell(1, 2); // X
    clickCell(2, 2); // O
    clickCell(1, 3); // X wins

    expect(screen.getByText("X Wins").parentElement).toHaveTextContent("1");

    // Undo the winning move
    fireEvent.click(screen.getByRole("button", { name: "Undo Last Move" }));

    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
    expect(screen.getByText("X Wins").parentElement).toHaveTextContent("0");
  });

  test("resets the game but preserves the scoreboard", () => {
    render(<App />);

    const clickCell = (row, column) => {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Row ${row}, Column ${column}`,
        }),
      );
    };

    // X wins
    clickCell(1, 1);
    clickCell(2, 1);
    clickCell(1, 2);
    clickCell(2, 2);
    clickCell(1, 3);

    fireEvent.click(screen.getByRole("button", { name: "Reset Game" }));

    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
    expect(screen.getByText("X Wins").parentElement).toHaveTextContent("1");
    expect(
      screen.getByRole("button", { name: "Row 1, Column 1" }),
    ).toBeEmptyDOMElement();
  });

  test("resets the scoreboard without resetting the current game", () => {
    render(<App />);

    // Make one move
    fireEvent.click(screen.getByRole("button", { name: "Row 1, Column 1" }));

    fireEvent.click(screen.getByRole("button", { name: "Reset Scoreboard" }));

    expect(
      screen.getByRole("button", { name: "Row 1, Column 1, X" }),
    ).toHaveTextContent("X");

    expect(screen.getByText("Player O's turn")).toBeInTheDocument();
    expect(screen.getByText("X Wins").parentElement).toHaveTextContent("0");
  });

  test("computer automatically responds after the human move", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Game Mode"), {
      target: { value: "computer" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Row 1, Column 1" }));

    // Wait for the computer's delayed move
    expect(
      await screen.findByRole("button", {
        name: /, O$/,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
  });

  test("ignores a move when the game is already over", () => {
    const state = {
      board: ["X", "X", "X", "O", "O", null, null, null, null],
      currentPlayer: "X",
      moves: [],
      winner: "X",
      winningCells: [0, 1, 2],
      isDraw: false,
      isGameOver: true,
    };

    const result = gameReducer(state, {
      type: "MAKE_MOVE",
      index: 5,
      player: "X",
    });

    expect(result).toBe(state);
  });

  test("ignores a move from the wrong player", () => {
    const state = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      moves: [],
      winner: null,
      winningCells: [],
      isDraw: false,
      isGameOver: false,
    };

    const result = gameReducer(state, {
      type: "MAKE_MOVE",
      index: 0,
      player: "O",
    });

    expect(result).toBe(state);
  });

  test("ignores a move on an occupied cell", () => {
    const state = {
      board: ["X", null, null, null, null, null, null, null, null],
      currentPlayer: "O",
      moves: [],
      winner: null,
      winningCells: [],
      isDraw: false,
      isGameOver: false,
    };

    const result = gameReducer(state, {
      type: "MAKE_MOVE",
      index: 0,
      player: "O",
    });

    expect(result).toBe(state);
  });

  test("ignores undo when there are no moves", () => {
    const state = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      moves: [],
      winner: null,
      winningCells: [],
      isDraw: false,
      isGameOver: false,
    };

    const result = gameReducer(state, {
      type: "UNDO_MOVE",
    });

    expect(result).toBe(state);
  });

  test("returns the current state for an unknown action", () => {
    const state = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      moves: [],
      winner: null,
      winningCells: [],
      isDraw: false,
      isGameOver: false,
    };

    const result = gameReducer(state, {
      type: "UNKNOWN_ACTION",
    });

    expect(result).toBe(state);
  });

  test("detects a draw and increments the draw score", () => {
    render(<App />);

    const clickCell = (row, column) => {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Row ${row}, Column ${column}`,
        }),
      );
    };

    // Complete a draw without creating a winning line
    clickCell(1, 1); // X
    clickCell(1, 2); // O
    clickCell(1, 3); // X
    clickCell(2, 2); // O
    clickCell(2, 1); // X
    clickCell(2, 3); // O
    clickCell(3, 2); // X
    clickCell(3, 1); // O
    clickCell(3, 3); // X

    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
    expect(screen.getByText("Draws").parentElement).toHaveTextContent("1");
  });
});
