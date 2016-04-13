import {createStore} from 'redux';
import {init} from '../game/init';
import {move} from '../game/move';
import {addRandomTile} from '../game/add';
import {update} from '../game/tile';

function getInitialState() {
  return {
    board: init(),
    changed: false
  };
}

function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case 'START': {
      return getInitialState();
    }
    case 'MOVE': {
      return move(state.board, action.direction);
    }
    case 'ADD_TILE': {
      return {
        ...state,
        board: addRandomTile(state.board, action.row, action.column, action.value)
      };
    }
    case 'UPDATE': {
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

export const store = createStore(reducer);
