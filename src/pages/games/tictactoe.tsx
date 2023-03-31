import { type NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
const TicTacToe: NextPage = () => {
  const [board, setBoard] = useState<>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        return;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        return;
      }
    }
    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
      return;
    } else if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
      return;
    } else {
      setWinner(null);
    }
  };

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = [...board];
    newBoard[row][col] = player;
    setBoard(newBoard);

    checkWinner();
    setPlayer(player === "X" ? "O" : "X");
  };
  return (
    <>
      <main className="flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex h-full w-full flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              TicTacToe Game
              <Link href="/games">Games</Link>
            </div>
            <div className="flex flex-col items-center gap-2">
              {winner ? ( // If there is a winner
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl font-bold">{winner} Wins!</div>
                  <button
                    className="rounded-md bg-slate-500 px-4 py-2 text-white"
                    onClick={() => {
                      setBoard([
                        ["", "", ""],
                        ["", "", ""],
                        ["", "", ""],
                      ]);
                      setPlayer("X");
                      setWinner(null);
                    }}
                  >
                    Play Again
                  </button>
                </div>
              ) : (
                <div className="text-4xl font-bold">{`${player}'s Turn`}</div>
              )}
            </div>
            <div className="grid h-80 w-80 grid-cols-3 flex-col gap-2 rounded-md bg-slate-400 p-2">
              {board.map((row, i) => {
                return (
                  <div className="grid grid-rows-3 gap-2" key={i}>
                    {row.map((col, j) => {
                      return (
                        <div
                          className="flex items-center justify-center rounded-md bg-slate-500"
                          key={`${i}-${j}`}
                          onClick={() => handleClick(i, j)}
                        >
                          {col}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TicTacToe;
