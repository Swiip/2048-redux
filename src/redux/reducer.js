import _ from 'lodash';
import {MOVE} from './actions';
import {size, createTile, addRandomTile, setPositions, clearOldTiles, move} from '../game';

function getInitialState() {
  const tiles = [];
  const cells = _.range(size).map(() => _.range(size).map(() => createTile(tiles)));
  tiles.push(..._.flatten(cells));

  addRandomTile(cells, tiles);
  setPositions(cells);

  return {
    cells,
    tiles,
    won: false
  };
}

export function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case MOVE: {
      const tiles = clearOldTiles(state.tiles);
      return {
        tiles,
        cells: move(state.cells, tiles, action.direction),
        won: state.won
      };
    }
    default: {
      return state;
    }
  }
}
