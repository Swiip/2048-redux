import _ from 'lodash';

import {size, fourProbability} from './conf';
import {createTile, updateClasses} from './tile';

export function addRandomTile(cells, tiles) {
  const emptyCells = _.flatten(
    cells.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        return {rowIndex, columnIndex, value: cell.value};
      });
    })
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
  updateClasses(tiles);
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
      hasChanged |= (targetTile.value !== cells[row][target].value);
    }
    cells[row] = resultRow;
  }
  return hasChanged;
}
