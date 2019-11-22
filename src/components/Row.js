import React from "react";

const getCellColor = ({
  colIndex,
  rowIndex,
  snakePosition,
  bodySnakePosition,
  apple
}) => {
  const isSnakePosition =
    snakePosition.y === rowIndex && snakePosition.x === colIndex;
  const isBodySnakePosition = bodySnakePosition.some(
    position => position.y === rowIndex && position.x === colIndex
  );
  const isApplePosition = apple.y === rowIndex && apple.x === colIndex;
  if (isSnakePosition) return "pink";
  else if (isBodySnakePosition) return "red";
  else if (isApplePosition) return "green";
  return "purple";
};

const Row = ({
  cell,
  colIndex,
  rowIndex,
  snakePosition,
  bodySnakePosition,
  apple
}) => {
  const color = getCellColor({
    colIndex,
    rowIndex,
    snakePosition,
    bodySnakePosition,
    apple
  });

  return (
    <div
      style={{
        margin: "10px",
        backgroundColor: color
      }}
    >
      {cell}
    </div>
  );
};

export default Row;
