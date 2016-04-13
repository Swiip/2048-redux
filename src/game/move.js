import _ from 'lodash';

import {size} from './conf';
import {createTile} from './tile';

// export function clearOldTiles(tiles) {
//   tiles = tiles.filter(tile => tile.markForDeletion === false);
//   tiles.forEach(tile => {
//     tile.markForDeletion = true;
//   });
//   return tiles;
// }

export function move(cells, direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  // let pair = {cells, merged: []};
  _.times(direction, () => {
    cells = rotateLeft(cells);
  });
  const moveResult = moveLeft(cells);
  cells = moveResult.cells;
  _.times(size - direction, () => {
    cells = rotateLeft(cells);
  });
  return {cells, changed: moveResult.changed};
}

function rotateLeft(cells) {
  // const rows = cells.length;
  // const columns = cells[0].length;
  // const result = [];
  // for (let row = 0; row < rows; ++row) {
  //   result.push([]);
  //   for (let column = 0; column < columns; ++column) {
  //     result[row][column] = cells[column][columns - row - 1];
  //   }
  // }
  // return result;
  return cells.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
      return cells[columnIndex][size - rowIndex - 1];
    });
  });
}

function moveLeft(cells) {
  let changed = false;
  // for (let row = 0; row < size; ++row) {
  cells = cells.map(row => {
    // const currentRow = cells[row].filter(tile => tile.value !== 0);
    const currentRow = row.filter(tile => tile.cell.value !== 0);
    // const resultRow = [];
    // for (let target = 0; target < size; ++target) {
    return _.range(size).map(target => {
      const merged = [];
      let targetTile;
      if (currentRow.length > 0) {
        targetTile = {...currentRow.shift().cell};
      } else {
        targetTile = createTile();
        // tiles = [...tiles, targetTile];
      }
      if (currentRow.length > 0 && currentRow[0].cell.value === targetTile.value) {
        const tile1 = targetTile;
        targetTile = createTile(targetTile.value);
        // tiles = [...tiles, targetTile];
        // tile1.mergedInto = {...targetTile};
        // tile1.mergedInto = {row: rowIndex, column: target};
        merged.push(tile1);
        const tile2 = {...currentRow.shift().cell};
        // tile2.mergedInto = {...targetTile};
        // tile2.mergedInto = {row: rowIndex, column: target};
        targetTile.value += tile2.value;
        merged.push(tile2);
      }
      // resultRow[target] = targetTile;
      changed |= (targetTile.value !== row[target].cell.value);
      return {
        cell: targetTile,
        merged
      };
    });
    // cells[row] = resultRow;
    // return resultRow;
  });
  return {cells, changed};
}
