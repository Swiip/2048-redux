import _ from 'lodash';

import {fourProbability} from './conf';
import {createTile} from './tile';

export function chooseRandomTile(cells) {
  const emptyCells = _.flatten(
    cells.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        return {rowIndex, columnIndex, value: cell.value};
      });
    })
  ).filter(cell => cell.value === 0);
  const index = ~~(Math.random() * emptyCells.length);
  const cell = emptyCells[index];
  const value = Math.random() < fourProbability ? 4 : 2;
  return {
    row: cell.rowIndex,
    column: cell.columnIndex,
    value
  };
}

export function addRandomTile(cells, tiles, row, column, value) {
  cells[row][column] = createTile(tiles, value);
}
