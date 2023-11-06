"use client";
import { Button } from "@ui/Button";
import { Select } from "@ui/Select";
import { SimpleLayout } from "@ui/SimpleLayout";
import { Range } from "@ui/Range";
import { useEffect, useState } from "react";
import { Board, type board, type cell } from "../_components/board";
import { search } from "./astar";

const createMaze = (size: number) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      const row = board[i];
      if (row) row.push("empty");
      else board.push(["empty"]);
    }
  }
  return board as board;
};
const addWalls = (board: board) => {
  const size = board.length;
  const wallCount = Math.floor(size * size * 0.3);
  for (let i = 0; i < wallCount; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const row = board[x];
    if (row?.[y]) row[y] = "wall";
  }
  const startRow = board[0];
  if (startRow?.[0]) startRow[0] = "start";
  const endRow = board[board.length - 1];
  if (endRow?.[board.length - 1]) endRow[board.length - 1] = "end";
  return board;
};

export default function MazeSearch() {
  const [selected, setSelected] = useState<string | number | undefined>(
    undefined,
  );
  const [value, setValue] = useState<number>(15);
  const [boards, setBoards] = useState<board[]>([addWalls(createMaze(value))]);
  const [currentBoard, setCurrentBoard] = useState<number>(0);
  const [isFound, setIsFound] = useState<boolean>(false);
  useEffect(() => {
    setBoards([addWalls(createMaze(value))]);
  }, [value]);
  useEffect(() => {
    if (isFound && currentBoard < boards.length - 1) {
      const timer = setTimeout(() => {
        setCurrentBoard((prev) => prev + 1);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [boards.length, currentBoard, isFound]);
  const showSearch = (path: {
    path: { x: number; y: number }[] | boolean;
    visited: { x: number; y: number }[];
  }) => {
    const visitedNodes: { x: number; y: number }[] = [];
    let num = 0;
    const firstBoard = boards[0];
    if (firstBoard === undefined) return num;
    const tempBoards = [firstBoard];
    path.visited.forEach((node) => {
      if (
        node !== undefined &&
        !visitedNodes.some((vnode) => vnode.x === node.x && vnode.y === node.y)
      ) {
        const board = tempBoards[num];
        if (board === undefined) return num;
        const row = board[node.x];
        if (row && row[node.y] !== "start" && row[node.x] !== "end")
          row[node.y] = "visited" as cell;
        tempBoards.push(board);
        num++;
        visitedNodes.push(node);
      }
    });
    if (typeof path.path === "boolean") return num;
    path.path.forEach((node) => {
      const board = tempBoards[num];
      if (board === undefined) return num;
      if (node !== undefined) {
        const row = board[node.x];
        if (row && row[node.y] !== "start" && row[node.x] !== "end")
          row[node.y] = "path" as cell;
        tempBoards.push(board);
        num++;
        visitedNodes.push(node);
      }
    });
    setBoards(tempBoards);
    return num;
  };

  const searchMaze = () => {
    const path = search(boards[0]!);
    showSearch(path);
    setIsFound(true);
  };
  const updateWall = (x: number, y: number) => {
    const board = boards[0];
    if (board === undefined) return;
    const row = board[x];
    if (row === undefined) return;
    const cell = row[y];
    if (cell === undefined) return;
    if (cell === "wall") row[y] = "empty";
    else if (cell === "empty") row[y] = "wall";
    setBoards([board]);
    setIsFound(false);
    setCurrentBoard(0);
  };
  const DisplayBoard = () => {
    const board = boards[currentBoard];
    if (board === undefined) return;
    return <Board board={board} updateWall={updateWall} />;
  };
  return (
    <SimpleLayout
      title="Maze Search"
      intro="These are various search algorithms that can be used to solve a maze."
    >
      <div>
        <div className="flex gap-2">
          <Select
            options={["A*", "BFS", "DFS"]}
            renderRow={(name) => <span>{name}</span>}
            value={selected}
            onChange={setSelected}
          />
          <Button onClick={() => searchMaze()} variant="primary">
            Search
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setBoards([addWalls(createMaze(value))]);
              setIsFound(false);
              setCurrentBoard(0);
            }}
          >
            Reset
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              const board = boards[0];
              if (board) {
                setBoards([board]);
              } else {
                setBoards([addWalls(createMaze(value))]);
              }
              setIsFound(false);
              setCurrentBoard(0);
            }}
          >
            Clear
          </Button>
          <Range label="Size" value={value} setValue={setValue} />
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        {boards[currentBoard] !== undefined && DisplayBoard()}
      </div>
    </SimpleLayout>
  );
}
