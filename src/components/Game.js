import React, { Component } from "react";
import Column from "./Column";

function generateApplePosition() {
  return {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array(10).fill(Array(10).fill(" . ")),
      //snakePosition = tete du serpent
      snakePosition: { x: 0, y: 0 },
      //bodySnakePosition = corps et queue du serpent
      bodySnakePosition: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      //gameState = statut du jeu
      gameState: "playing",
      direction: "ArrowRight",
      apple: generateApplePosition(),
      snakeSize: 2
    };
    this.gridRef = null;
  }

  componentDidMount() {
    setInterval(this.loopGame.bind(this), 350);
    this.gridRef.focus();
  }

  loopGame() {
    this.moveSnake();
    this.collision();
    this.checkApple();
  }

  checkApple() {
    this.setState(prevState => {
      const isEatingApple =
        prevState.apple.x === prevState.snakePosition.x &&
        prevState.apple.y === prevState.snakePosition.y;

      if (isEatingApple) {
        return {
          apple: generateApplePosition(),
          snakeSize: isEatingApple
            ? prevState.snakeSize + 1
            : prevState.snakeSize
        };
      }
    });
  }

  collision() {
    this.setState(prevState => {
      const wallCollision =
        prevState.snakePosition.x < 0 ||
        prevState.snakePosition.y < 0 ||
        prevState.snakePosition.x >= 10 ||
        prevState.snakePosition.y >= 10;

      const bodyCollision = prevState.bodySnakePosition.some(
        position =>
          position.y === prevState.snakePosition.y &&
          position.x === prevState.snakePosition.x
      );
      return { gameState: wallCollision || bodyCollision ? "loose" : "run" };
    });
    console.log(this.state.gameState);
  }

  moveSnake() {
    this.setState(prevState => {
      const offsetX =
        prevState.direction === "ArrowRight"
          ? 1
          : prevState.direction === "ArrowLeft"
          ? -1
          : 0;

      const offsetY =
        prevState.direction === "ArrowUp"
          ? -1
          : prevState.direction === "ArrowDown"
          ? 1
          : 0;
      //direction nouvelle position de la tete du serpent
      const newHeadSnakePosition = {
        x: prevState.snakePosition.x + offsetX,
        y: prevState.snakePosition.y + offsetY
      };

      const { snakePosition, bodySnakePosition, snakeSize } = this.state;
      //direction nouvelle position du serpent dans le jeu
      const snakeShouldGrow = bodySnakePosition.length === snakeSize ? -1 : 0;
      const newBodySnakePosition = [
        snakePosition,
        ...bodySnakePosition.slice(
          0,
          bodySnakePosition.length + snakeShouldGrow
        )
      ];

      return {
        snakePosition: newHeadSnakePosition,
        bodySnakePosition: newBodySnakePosition
      };
    });
  }

  //touche directionnel pour savoir qu'elle touche on tape
  directionArrow({ key }) {
    this.setState({
      direction: key
    });
  }

  render() {
    const { grid, snakePosition, bodySnakePosition, apple } = this.state;
    return (
      <div
        onKeyDown={this.directionArrow.bind(this)}
        tabIndex="-1"
        ref={el => (this.gridRef = el)}
      >
        {grid.map((row, rowIndex) => (
          <Column
            row={row}
            rowIndex={rowIndex}
            snakePosition={snakePosition}
            bodySnakePosition={bodySnakePosition}
            apple={apple}
          />
        ))}
      </div>
    );
  }
}

export default Game;
