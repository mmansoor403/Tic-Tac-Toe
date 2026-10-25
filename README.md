# Tic Tac Toe — React

## 1. Project Overview

A responsive Tic Tac Toe game built with React that supports two-player gameplay and playing against a computer opponent. The application detects wins and draws, tracks scores, highlights winning combinations, and allows players to undo moves or restart games.

## 2. Tech Stack

- **React** — UI development using functional components and Hooks
- **JavaScript (ES6+)** — Game logic and state management
- **HTML5 and CSS3** — Structure, styling, and responsive layout
- **Create React App** — Development and production build tooling
- **Jest and React Testing Library** — Unit and component testing

## 3. Features Implemented

- Two-player mode: Player X and Player O take alternating turns.
- Computer mode: Play against a computer opponent.
- Win detection: Identifies winning rows, columns, and diagonals.
- Winning-line highlight: Highlights the cells that form a winning combination.
- Draw detection: Identifies a draw when the board is full without a winner.
- Scoreboard: Tracks wins for X, wins for O, and draws.
- Undo: Reverts the previous move; in computer mode, undoes the latest human-computer turn pair.
- Reset Game: Starts a new game while preserving the scoreboard.
- Reset Scoreboard: Clears accumulated scores.
- Responsive layout: Supports desktop and mobile screen sizes.
- Input validation: Prevents moves in occupied cells and after a game has ended.

## 4. How to Run the Frontend Locally

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/mmansoor403/Tic-Tac-Toe.git
cd Tic-Tac-Toe
npm install
npm start
```

### Start the development server

```bash
npm start
```

The application will open in your browser, typically at `http://localhost:3000`.

### Create a production build

```bash
npm run build
```

## 5. How to Run Tests

Run the test suite once:

```bash
npm test -- --watchAll=false
```

Run tests with coverage reporting:

```bash
npm test -- --watchAll=false --coverage
```

The tests cover game logic, computer move selection, game state transitions, gameplay interactions, undo behavior, and scoreboard updates.

## 6. AI Tools and Prompt Summary

AI assistance was used during development to support implementation planning, review game logic, identify edge cases, and improve test coverage.

Topics explored included:

- Structuring React components and separating styling.
- Implementing winner and draw detection.
- Designing computer move selection, including winning and blocking moves.
- Handling undo, reset, and scoreboard behavior.
- Writing unit and component tests.
- Reviewing responsive styling and production readiness.

AI-generated suggestions were reviewed and tested against the application's expected behavior.

**Tools used:** [chatGPT]

## 7. Design Decisions

- **Component-based structure:** The game board, move history, scoreboard, and controls are separated into reusable components.
- **Separation of concerns:** Core game rules and computer move selection are kept in a utility module rather than mixed into UI components.
- **Reducer-based game state:** A reducer centralizes game transitions and validates actions such as making and undoing moves.
- **Local state:** React state is sufficient for the game's board, turn, mode, and scores; no external state-management library is needed.
- **Rule-based computer opponent:** The computer prioritizes winning moves, blocks immediate player wins, prefers the center, then available corners, and finally any remaining cell.
- **No backend:** All game state is maintained in the browser, keeping the application simple and self-contained.

## 8. Clarifications and Assumptions

- The application is a frontend-only implementation and does not require a server or database.
- The game supports two local players or one local player against the computer.
- Player X starts each new game.
- A completed game cannot accept further moves until it is reset or undone.
- Resetting a game preserves the scoreboard; resetting the scoreboard clears scores separately.
- In computer mode, undo removes the most recent human move and the computer's corresponding response when both exist.

## 9. Known Limitations

- The computer opponent uses a rule-based strategy rather than a complete minimax algorithm, so it is not guaranteed to play optimally.
- Game state and scores are not persisted after refreshing or closing the browser.
- Multiplayer is limited to two players on the same device.
- There is no backend, online multiplayer, or user authentication.

## 10. Future Improvements

- Implement a minimax-based computer opponent for optimal play.
- Persist scores using local storage.
- Add configurable difficulty levels.
- Improve accessibility with keyboard navigation and more comprehensive screen-reader announcements.
- Add animations and enhanced visual feedback.
- Introduce online multiplayer and persistent player statistics if backend support is added.

---

## Getting Started

```bash
npm install
npm start
```

Run the tests with `npm test -- --watchAll=false`.
