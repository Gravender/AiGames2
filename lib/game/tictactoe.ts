/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export type State = {
  board: string[];
  player: string;
  winner: string;
  makeMove: (index: number) => void;
  canMove: (index: number) => boolean;
  undoMove: (index: number) => void;
  getAvailableMoves: () => number[];
  checkWinner: () => string;
  isGameOver: () => boolean;
  getScore: () => number;
  reset: () => void;
};
export const tictactoe = (): State => {
  let board = Array(9).fill("");
  let player = "X";
  let winner = "";

  const makeMove = (index: number) => {
    if (winner) return;
    if (board[index] !== "") return;
    board[index] = player;
    player = player === "X" ? "O" : "X";
  };
  const canMove = (index: number) => {
    if (winner === "") return false;
    if (board[index]) return false;
    return true;
  };
  const undoMove = (index: number) => {
    board[index] = "";
    player = player === "X" ? "O" : "X";
  };
  const getAvailableMoves = () => {
    const tempBoard = board.map((cell, index) => {
      if (cell) return -1;
      return index;
    });
    return tempBoard.filter((cell) => cell !== -1);
  };
  const checkWinner = () => {
    //check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 1] &&
        board[i] === board[i + 2]
      ) {
        winner = board[i];
        return winner;
      }
    }
    //check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        winner = board[i];
        return winner;
      }
    }
    //check diagonals
    if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
      winner = board[0];
      return winner;
    }
    if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
      winner = board[2];
      return winner;
    }
    //check draw
    if (board.every((cell) => cell)) {
      winner = "Draw";
      return winner;
    }
    return "";
  };
  const isGameOver = () => {
    if (winner !== "") return true;
    return false;
  };
  const getScore = () => {
    if (winner === "X") return 1;
    if (winner === "O") return -1;
    return 0;
  };
  const reset = () => {
    board = Array(9).fill(null);
    player = "X";
    winner = "";
  };
  return {
    board,
    player,
    winner,
    makeMove,
    canMove,
    undoMove,
    getAvailableMoves,
    checkWinner,
    isGameOver,
    getScore,
    reset,
  };
};
