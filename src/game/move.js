import _ from 'lodash';

import {size} from './conf';
import {createTile} from './tile';

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
  const changed = moveLeft(cells, tiles);
  _.times(size - direction, () => {
    cells = rotateLeft(cells);
  });
  return {cells, changed};
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
