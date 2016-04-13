import {createStore} from './redux-lite';
import {init} from '../../game/init';
import {move} from '../../game/move';
import {addRandomTile} from '../../game/add';
import {update} from '../../game/tile';

function getInitialState() {
  return {
    board: init(),
    changed: false
  };
}

//////// Reducer ///////////

// START
return getInitialState();

// MOVE
return move(state.board, action.direction);

// ADD
return {
  ...state,
  board: addRandomTile(state.board, action.row, action.column, action.value)
};

// UPDATE
return {
  ...state,
  board: update(state.board)
};
