import {MOVE, START, ADD_TILE, UPDATE} from '../actions';
import {init} from '../../game/init';
import {move} from '../../game/move';
import {addRandomTile} from '../../game/add';
import {updatePositions, updateClasses} from '../../game/tile';

function getInitialState() {
  const cells = init();
  return {cells, changed: false};
}

export function board(state = getInitialState(), action) {
  switch (action.type) {
    case START: {
      return getInitialState();
    }
    case MOVE: {
      // const clearedTiles = clearOldTiles(state.tiles);
      const {cells, changed} = move(state.cells, action.direction);
      return {cells, changed};
    }
    case ADD_TILE: {
      const cells = addRandomTile(state.cells, action.row, action.column, action.value);
      // const cells = [...state.cells];
      return {...state, cells};
    }
    case UPDATE: {
      const positionedCells = updatePositions(state.cells);
      const cells = updateClasses(positionedCells);
      return {...state, cells};
    }
    default: {
      return state;
    }
  }
}
