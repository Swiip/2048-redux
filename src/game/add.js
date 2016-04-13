import _ from 'lodash';

import {fourProbability} from './conf';
import {createTile} from './tile';

export function chooseRandomTile(board) {
  const emptyCells = _.flatten(
    board.map((row, rowIndex) => {
      return row.map((tile, columnIndex) => {
        return {rowIndex, columnIndex, value: tile.value};
      });
    })
  ).filter(tile => tile.value === 0);
  const index = ~~(Math.random() * emptyCells.length);
  const cell = emptyCells[index];
  const value = Math.random() < fourProbability ? 4 : 2;
  return {
    row: cell.rowIndex,
    column: cell.columnIndex,
    value
  };
}

export function addRandomTile(board, rowIndex, columnIndex, value) {
  // cells[row][column] = createTile(value);
  return board.map((row, r) => {
    return row.map((tile, c) => {
      if (r === rowIndex && c === columnIndex) {
        tile = createTile(value);
      }
      return tile;
    });
  });
}
