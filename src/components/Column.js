import React from "react";
import Row from "./Row";
const Column = ({ row, rowIndex, snakePosition, bodySnakePosition,apple }) => {
  return (
    <div style={{ display: "flex" }}>
      {row.map((cell, colIndex) => (
        <div style={{ border: "black 1px solid", background: "purple" }}>
          {" "}
          <Row
            cell={cell}
            rowIndex={rowIndex}
            colIndex={colIndex}
            snakePosition={snakePosition}
            bodySnakePosition={bodySnakePosition}
            apple={apple}
          />
        </div>
      ))}
    </div>
  );
};

export default Column;
