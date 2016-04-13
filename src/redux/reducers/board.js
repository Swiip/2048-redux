import {MOVE, START, ADD_TILE, UPDATE} from '../actions';
import {init} from '../../game/init';
import {move} from '../../game/move';
import {addRandomTile} from '../../game/add';
// import {updatePositions, updateClasses} from '../../game/tile';
import {update} from '../../game/tile';

function getInitialState() {
  return {
    board: init(),
    changed: false
  };
}

export function board(state = getInitialState(), action) {
  switch (action.type) {
    case START: {
      return getInitialState();
    }
    case MOVE: {
      // const clearedTiles = clearOldTiles(state.tiles);
      const {board, changed} = move(state.board, action.direction);
      return {board, changed};
    }
    case ADD_TILE: {
      // const cells = addRandomTile(state.cells, action.row, action.column, action.value);
      // const cells = [...state.cells];
      return {
        ...state,
        board: addRandomTile(state.board, action.row, action.column, action.value)
      };
    }
    case UPDATE: {
      // const positionedCells = updatePositions(state.cells);
      // const cells = updateClasses(positionedCells);
      return {
        ...state,
        board: update(state.board)
      };
    }
    default: {
      return state;
    }
  }
}
