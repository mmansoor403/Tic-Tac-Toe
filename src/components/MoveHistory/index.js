import React from "react";
import "./styles.css";

function MoveHistory({ moves }) {
  return (
    <section className="move-history">
      <h2>Move History</h2>

      {moves.length === 0 ? (
        <p className="move-history-empty">No moves yet. Start playing!</p>
      ) : (
        <ol className="move-history-list">
          {moves.map((move) => (
            <li key={move.id} className="move-history-item">
              <span
                className={`move-player player-${move.player.toLowerCase()}`}
              >
                {move.player}
              </span>

              <span className="move-description">
                Move {move.number}: Row {move.row}, Column {move.column}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default MoveHistory;
