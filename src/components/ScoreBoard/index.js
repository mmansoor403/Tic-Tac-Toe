import React from "react";
import "./styles.css";

function Scoreboard({ scores }) {
  return (
    <section className="scoreboard">
      <h2>Scoreboard</h2>

      <div className="scoreboard-grid">
        <div className="score-item score-x">
          <span>X Wins</span>
          <strong>{scores.X}</strong>
        </div>

        <div className="score-item score-o">
          <span>O Wins</span>
          <strong>{scores.O}</strong>
        </div>

        <div className="score-item score-draw">
          <span>Draws</span>
          <strong>{scores.draws}</strong>
        </div>
      </div>
    </section>
  );
}

export default Scoreboard;
