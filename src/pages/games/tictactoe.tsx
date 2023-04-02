import { type NextPage } from "next";
import { useState } from "react";
import { tictactoe as ticTac, type State } from "lib/game/tictactoe";
import { minmnax } from "lib/algorithms/minmax";
import Link from "next/link";
const TicTacToe: NextPage = () => {
  const [game, setGame] = useState<State>(() => ticTac());
  const [board, setBoard] = useState<string[]>(game.board);
  const [player, setPlayer] = useState<string>(game.player);
  const [winner, setWinner] = useState<string>(game.winner);
  const [isAi, setIsAi] = useState<boolean>(false);

  const handleReset = () => {
    const newGame = ticTac();
    setGame(newGame);
    setBoard(newGame.board);
    setPlayer(newGame.player);
    setWinner(newGame.checkWinner());
  };

  const handleMove = (index: number) => {
    const newGame = { ...game };
    newGame.makeMove(index);
    setGame(newGame);
    setBoard(newGame.board);
    setPlayer(newGame.player);
    setWinner(newGame.checkWinner());
  };

  const handleAIMove = (index: number) => {
    const newGame = { ...game };
    newGame.makeMove(index);
    if (newGame.checkWinner() === "") {
      const aiMove = minmnax(newGame, 6);
      newGame.makeMove(aiMove);
      setGame(newGame);
      setBoard(newGame.board);
      setPlayer(newGame.player);
      setWinner(newGame.checkWinner());
    } else {
      setWinner(newGame.checkWinner());
    }
  };

  const handleSquareClick = (index: number) => {
    if (isAi) {
      handleAIMove(index);
    } else {
      handleMove(index);
    }
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
              {winner ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl font-bold">
                    {winner === "Draw" ? winner : `${winner} Wins!`}
                  </div>
                  <button
                    className="rounded-md bg-slate-500 px-4 py-2 text-white"
                    onClick={handleReset}
                  >
                    Play Again
                  </button>
                </div>
              ) : (
                <div className="text-4xl font-bold">{`${player}'s Turn`}</div>
              )}
            </div>
            <button
              className="w-20 rounded-md bg-slate-500 px-4 py-2 text-white"
              onClick={() => setIsAi(!isAi)}
            >
              {isAi ? "Player" : "AI"}
            </button>
            <div className="grid h-80 w-80 grid-cols-3 grid-rows-3 flex-col gap-2 rounded-md bg-slate-400 p-2">
              {board.map((row, i) => {
                return (
                  <div
                    className="flex items-center justify-center rounded-md bg-slate-500"
                    key={i}
                    onClick={() => handleSquareClick(i)}
                  >
                    {row}
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
