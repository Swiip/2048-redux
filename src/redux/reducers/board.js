import {MOVE, START, ADD_TILE, UPDATE, UPDATE_UNDO} from '../actions';
import {init} from '../../game/init';
import {move} from '../../game/move';
import {addRandomTile} from '../../game/add';
import {update, updateUndo} from '../../game/tile';

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
      return move(state.board, action.direction);
    }
    case ADD_TILE: {
      return {
        ...state,
        board: addRandomTile(state.board, action.row, action.column, action.value)
      };
    }
    case UPDATE: {
      return {
        ...state,
        board: update(state.board)
      };
    }
    case UPDATE_UNDO: {
      return {
        ...state,
        board: updateUndo(state.board, action.oldBoard)
      }
    }
    default: {
      return state;
    }
  }
}
