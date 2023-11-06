import { cva } from "class-variance-authority";

export type cell = "wall" | "empty" | "start" | "end" | "visited" | "path";
export type board = cell[][];

type BoardProps = {
  board: board;
  updateWall: (x: number, y: number) => void;
};
const selectCellVariant = cva(
  "w-full h-full border border-zinc-300 dark:border-zinc-700",
  {
    variants: {
      cell: {
        wall: "bg-zinc-700 dark:bg-zinc-300",
        empty: "bg-zinc-100 dark:bg-zinc-800",
        visited: "bg-yellow-500",
        path: "bg-blue-500",
        start: "bg-green-500",
        end: "bg-red-500",
      },
    },
    defaultVariants: {
      cell: "empty",
    },
  },
);

export function Board({ board, updateWall }: BoardProps) {
  return (
    <div
      className="grid h-[85vh] w-[85vh]"
      style={{
        gridTemplateColumns: `repeat(${board.length},1fr)`,
        gridTemplateRows: `repeat(${board.length},1fr)`,
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}-${cell}`}
            className={selectCellVariant({ cell })}
            onClick={() => updateWall(i, j)}
          />
        )),
      )}
    </div>
  );
}
