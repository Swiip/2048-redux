import {init} from '../game/init';
import {move} from '../game/move';
import {addRandomTile} from '../game/add';
import {update} from '../game/tile';
import {START, MOVE, ADD_TILE, UPDATE} from './actions';

function getInitialState() {
  return {
    board: init(),
    changed: false
  };
}

export function reducer(state = getInitialState(), action) {
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
    default: {
      return state;
    }
  }
}
