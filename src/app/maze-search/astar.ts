import { type board, type cell } from "../_components/board";

const findCell = (board: board, type: cell) => {
  const row = board.findIndex((row) => row.find((cell) => cell === type));
  return { x: row, y: board[row]?.findIndex((cell) => cell === type) ?? 1 };
};
type node = {
  parent: node | null;
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
};
const isValid = (board: board, node: { x: number; y: number }) => {
  const { x, y } = node;
  return (
    x >= 0 &&
    x < board.length &&
    y >= 0 &&
    y < board[0]!.length &&
    board[x]![y] !== "wall"
  );
};
const getAdjacent = (
  board: board,
  node: node,
  end: { x: number; y: number },
) => {
  const directions: { x: number; y: number }[] = [
    { x: node.x - 1, y: node.y },
    { x: node.x + 1, y: node.y },
    { x: node.x, y: node.y - 1 },
    { x: node.x, y: node.y + 1 },
  ];
  const adjacentNodes: node[] = [];
  directions.forEach((direction) => {
    if (isValid(board, direction)) {
      adjacentNodes.push({
        parent: node,
        x: direction.x,
        y: direction.y,
        f: 0,
        g: 0,
        h: 0,
      });
    }
  });
  adjacentNodes.forEach((adjacentNode) => {
    adjacentNode.g = node.g + 1;
    adjacentNode.h =
      (adjacentNode.x - end.x) ** 2 + (adjacentNode.y - end.y) ** 2;
    adjacentNode.f = adjacentNode.g + adjacentNode.h;
  });

  return adjacentNodes;
};
export const search = (board: board) => {
  const start = findCell(board, "start");
  const end = findCell(board, "end");
  const visited: { x: number; y: number }[] = [];
  const openList: node[] = [];
  const closedList: node[] = [];
  openList.push({ parent: null, x: start.x, y: start.y, f: 0, g: 0, h: 0 });
  let path: { x: number; y: number }[] = [];

  while (openList.length > 0) {
    let currentNode = openList[0];

    let currentIndex = 0;
    openList.forEach((openNode, index) => {
      if (currentNode && openNode.f < currentNode.f) {
        currentNode = openNode;
        currentIndex = index;
      }
    });
    openList.splice(currentIndex, 1);
    if (currentNode) {
      closedList.push(currentNode);
      visited.push({ x: currentNode.x, y: currentNode.y });
      if (currentNode.x === end.x && currentNode.y === end.y) {
        let current: node | null = currentNode;
        while (current !== null) {
          path.push({ x: current.x, y: current.y });
          current = current.parent;
        }
        path = path.reverse();
        return { path, visited };
      }
      const adjacentNodes = getAdjacent(board, currentNode, end);
      adjacentNodes.forEach((adjacentNode) => {
        let inClosedList = false;
        closedList.forEach((closedNode) => {
          if (
            closedNode.x === adjacentNode.x &&
            closedNode.y === adjacentNode.y
          ) {
            inClosedList = true;
          }
        });
        if (!inClosedList) {
          let inOpenList = false;
          openList.forEach((openNode) => {
            if (
              openNode.x === adjacentNode.x &&
              openNode.y === adjacentNode.y &&
              openNode.g < adjacentNode.g
            ) {
              inOpenList = true;
            }
          });
          if (!inOpenList) {
            openList.push(adjacentNode);
          }
        }
      });
    }
  }
  return { path: false, visited };
};
