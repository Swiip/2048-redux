import {MOVE, START, ADD_TILE, UPDATE} from '../actions';
import {init} from '../../game/init';
import {clearOldTiles, move} from '../../game/move';
import {addRandomTile} from '../../game/add';
import {updatePositions, updateClasses} from '../../game/tile';

function getInitialState() {
  const {tiles, cells} = init();
  return {tiles, cells, changed: false};
}

export function board(state = getInitialState(), action) {
  switch (action.type) {
    case START: {
      return getInitialState();
    }
    case MOVE: {
      const tiles = clearOldTiles(state.tiles);
      const {cells, changed} = move(state.cells, tiles, action.direction);
      return {tiles, cells, changed};
    }
    case ADD_TILE: {
      addRandomTile(state.cells, state.tiles, action.row, action.column, action.value);
      const cells = state.cells.map(cell => cell);
      return Object.assign({}, state, {cells});
    }
    case UPDATE: {
      const cells = updatePositions(state.cells);
      updateClasses(state.tiles);
      return Object.assign({}, state, {cells});
    }
    default: {
      return state;
    }
  }
}
