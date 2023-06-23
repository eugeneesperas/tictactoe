import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // State variables
  const [board, setBoard] = useState(Array(9).fill("")); // Represents the game board
  const [currentPlayer, setCurrentPlayer] = useState("X"); // Tracks the current player
  const [gameOver, setGameOver] = useState(false); // Indicates if the game is over

  // Check for a draw condition whenever the board changes
  useEffect(() => {
    checkDraw();
  }, [board]);

  // Handle cell click event
  const handleClick = (index) => {
    if (!gameOver && board[index] === "") {
      // If game is not over and the clicked cell is empty
      const newBoard = [...board];
      newBoard[index] = currentPlayer; // Set the current player's mark (X or O)
      setBoard(newBoard); // Update the board

      if (checkWin(currentPlayer, newBoard)) {
        // Check if the current player has won
        alert(`Player ${currentPlayer} wins!`); // Display the winner
        setGameOver(true); // Set the game over flag to true
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Switch to the other player's turn
      }
    }
  };

  // Check if the current player has achieved a winning combination
  const checkWin = (player, board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return board[a] === player && board[b] === player && board[c] === player;
    });
  };

  // Check for a draw condition
  const checkDraw = () => {
    if (!board.includes("") && !checkWin("X", board) && !checkWin("O", board)) {
      // If the board is full and no player has won
      alert("The game ends in a draw!"); // Display draw message
      setGameOver(true); // Set the game over flag to true
    }
  };

  // Reset the game to the initial state
  const resetGame = () => {
    setBoard(Array(9).fill("")); // Reset the board to empty cells
    setCurrentPlayer("X"); // Set the current player back to X
    setGameOver(false); // Set the game over flag to false
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button className="btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
