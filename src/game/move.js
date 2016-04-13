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

export function move(board, direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  // let pair = {cells, merged: []};
  _.times(direction, () => {
    board = rotateLeft(board);
  });
  const moveResult = moveLeft(board);
  board = moveResult.board;
  _.times(size - direction, () => {
    board = rotateLeft(board);
  });
  return {board, changed: moveResult.changed};
}

function rotateLeft(board) {
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
  return board.map((row, rowIndex) => {
    return row.map((cell, columnIndex) => {
      return board[columnIndex][size - rowIndex - 1];
    });
  });
}

function moveLeft(board) {
  let changed = false;
  // for (let row = 0; row < size; ++row) {
  board = board.map(row => {
    // const currentRow = cells[row].filter(tile => tile.value !== 0);
    const currentRow = row.filter(tile => tile.value !== 0);
    // const resultRow = [];
    // for (let target = 0; target < size; ++target) {
    return _.range(size).map(target => {
      let targetTile;
      if (currentRow.length > 0) {
        targetTile = {...currentRow.shift()};
      } else {
        targetTile = createTile();
        // tiles = [...tiles, targetTile];
      }
      if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
        const tile1 = targetTile;
        targetTile = createTile(targetTile.value);
        targetTile.merged = [];
        // tiles = [...tiles, targetTile];
        // tile1.mergedInto = {...targetTile};
        // tile1.mergedInto = {row: rowIndex, column: target};
        targetTile.merged.push(tile1);
        const tile2 = {...currentRow.shift()};
        // tile2.mergedInto = {...targetTile};
        // tile2.mergedInto = {row: rowIndex, column: target};
        targetTile.value += tile2.value;
        targetTile.merged.push(tile2);
      }
      // resultRow[target] = targetTile;
      changed |= (targetTile.value !== row[target].value);
      return targetTile;
    });
    // cells[row] = resultRow;
    // return resultRow;
  });
  return {board, changed};
}
