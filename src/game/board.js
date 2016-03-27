import {Tile} from './tile';

function rotateLeft(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const res = [];
  for (let row = 0; row < rows; ++row) {
    res.push([]);
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
}

export class Board {
  constructor() {
    this.tiles = [];
    this.cells = [];
    for (let i = 0; i < Board.size; ++i) {
      this.cells[i] = [this.addTile(), this.addTile(), this.addTile(), this.addTile()];
    }
    this.addRandomTile();
    this.setPositions();
    this.won = false;
  }

  addTile() {
    const res = new Tile();
    Tile.apply(res, arguments);
    this.tiles.push(res);
    return res;
  }

  moveLeft() {
    let hasChanged = false;
    for (let row = 0; row < Board.size; ++row) {
      const currentRow = this.cells[row].filter(tile => tile.value !== 0);
      const resultRow = [];
      for (let target = 0; target < Board.size; ++target) {
        let targetTile = currentRow.length ? currentRow.shift() : this.addTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          const tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          const tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= (targetTile.value === 2048);
        hasChanged |= (targetTile.value !== this.cells[row][target].value);
      }
      this.cells[row] = resultRow;
    }
    return hasChanged;
  }

  setPositions() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  }

  addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < Board.size; ++r) {
      for (let c = 0; c < Board.size; ++c) {
        if (this.cells[r][c].value === 0) {
          emptyCells.push({r, c});
        }
      }
    }
    const index = ~~(Math.random() * emptyCells.length);
    const cell = emptyCells[index];
    const newValue = Math.random() < Board.fourProbability ? 4 : 2;
    this.cells[cell.r][cell.c] = this.addTile(newValue);
  }

  move(direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    this.clearOldTiles();
    for (let i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    const hasChanged = this.moveLeft();
    for (let i = direction; i < 4; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    if (hasChanged) {
      this.addRandomTile();
    }
    this.setPositions();
    return this;
  }

  clearOldTiles() {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion === false);
    this.tiles.forEach(tile => {
      tile.markForDeletion = true;
    });
  }

  hasWon() {
    return this.won;
  }

  hasLost() {
    let canMove = false;
    for (let row = 0; row < Board.size; ++row) {
      for (let column = 0; column < Board.size; ++column) {
        canMove |= (this.cells[row][column].value === 0);
        for (let dir = 0; dir < 4; ++dir) {
          const newRow = row + Board.deltaX[dir];
          const newColumn = column + Board.deltaY[dir];
          if (newRow < 0 || newRow >= Board.size || newColumn < 0 || newColumn >= Board.size) {
            continue;
          }
          canMove |= (this.cells[row][column].value === this.cells[newRow][newColumn].value);
        }
      }
    }
    return !canMove;
  }
}

Board.size = 4;
Board.fourProbability = 0.1;
Board.deltaX = [-1, 0, 1, 0];
Board.deltaY = [0, -1, 0, 1];
