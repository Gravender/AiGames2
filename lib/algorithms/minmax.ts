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
export const minmnax = (state: State, depth: number) => {
  const { getAvailableMoves, isGameOver, getScore, makeMove, undoMove } = state;

  if (isGameOver() || depth === 0) {
    const score = getScore();
    console.log("score", score);
    return (score * depth + 1) / (depth + 1);
  }
  const availableMoves = getAvailableMoves();

  let bestScore = -Infinity;
  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    if (move) {
      makeMove(move);
      const score = -minmnax(state, depth - 1);
      undoMove(move);
      bestScore = Math.max(score, bestScore);
    }
  }
  return bestScore;
};
