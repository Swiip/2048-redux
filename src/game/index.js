import _ from 'lodash';

export const size = 4;
export const fourProbability = 0.1;

let tileId = 0;

export function createTile(tiles, value, row, column) {
  const newTile = {
    id: tileId++,
    value: value || 0,
    row: row || -1,
    column: column || -1,
    oldRow: -1,
    oldColumn: -1,
    markForDeletion: false,
    mergedInto: null
  };
  tiles.push(newTile);
  return newTile;
}

export function addRandomTile(cells, tiles) {
  const emptyCells = _.flatten(
    cells.map((row, rowIndex) => row.map((cell, columnIndex) => ({rowIndex, columnIndex, value: cell.value})))
  ).filter(cell => cell.value === 0);
  const index = ~~(Math.random() * emptyCells.length);
  const cell = emptyCells[index];
  const newValue = Math.random() < fourProbability ? 4 : 2;
  cells[cell.rowIndex][cell.columnIndex] = createTile(tiles, newValue);
}

export function setPositions(cells) {
  cells.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      tile.oldRow = tile.row;
      tile.oldColumn = tile.column;
      tile.row = rowIndex;
      tile.column = columnIndex;
      tile.markForDeletion = false;
    });
  });
}

export function clearOldTiles(tiles) {
  tiles = tiles.filter(tile => tile.markForDeletion === false);
  tiles.forEach(tile => {
    tile.markForDeletion = true;
  });
  return tiles;
}

export function move(cells, tiles, direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  _.times(direction, () => {
    cells = rotateLeft(cells);
  });
  const hasChanged = moveLeft(cells, tiles);
  _.times(size - direction, () => {
    cells = rotateLeft(cells);
  });
  if (hasChanged) {
    addRandomTile(cells, tiles);
  }
  setPositions(cells);
  return cells;
}

function rotateLeft(cells) {
  const rows = cells.length;
  const columns = cells[0].length;
  const result = [];
  for (let row = 0; row < rows; ++row) {
    result.push([]);
    for (let column = 0; column < columns; ++column) {
      result[row][column] = cells[column][columns - row - 1];
    }
  }
  return result;
}

function moveLeft(cells, tiles) {
  let hasChanged = false;
  for (let row = 0; row < size; ++row) {
    const currentRow = cells[row].filter(tile => tile.value !== 0);
    const resultRow = [];
    for (let target = 0; target < size; ++target) {
      let targetTile = currentRow.length ? currentRow.shift() : createTile(tiles);
      if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
        const tile1 = targetTile;
        targetTile = createTile(tiles, targetTile.value);
        tile1.mergedInto = targetTile;
        const tile2 = currentRow.shift();
        tile2.mergedInto = targetTile;
        targetTile.value += tile2.value;
      }
      resultRow[target] = targetTile;
      // won |= (targetTile.value === 2048);
      hasChanged |= (targetTile.value !== cells[row][target].value);
    }
    cells[row] = resultRow;
  }
  return hasChanged;
}

export function isNew(tile) {
  return tile.oldRow === -1 && !tile.mergedInto;
}

export function hasMoved(tile) {
  return (
    fromRow(tile) !== -1 &&
    (fromRow(tile) !== toRow(tile) || fromColumn(tile) !== toColumn(tile))
  ) || tile.mergedInto;
}

export function fromRow(tile) {
  return tile.mergedInto ? tile.row : tile.oldRow;
}

export function fromColumn(tile) {
  return tile.mergedInto ? tile.column : tile.oldColumn;
}

export function toRow(tile) {
  return tile.mergedInto ? tile.mergedInto.row : tile.row;
}

export function toColumn(tile) {
  return tile.mergedInto ? tile.mergedInto.column : tile.column;
}
