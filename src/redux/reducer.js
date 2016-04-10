import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {init} from '../game/init';
import {addRandomTile} from '../game/add';
import {updatePositions, updateClasses} from '../game/tile';
import {clearOldTiles, move} from '../game/move';
import {START, MOVE, ADD_TILE, UPDATE} from './actions';

function getInitialState() {
  const {tiles, cells} = init();
  return {tiles, cells, changed: false};
}

function reducer(state = getInitialState(), action) {
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
      const cells = [...state.cells];
      return {...state, cells};
    }
    case UPDATE: {
      const cells = updatePositions(state.cells);
      updateClasses(state.tiles);
      return {...state, cells};
    }
    default: {
      return state;
    }
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(createLogger())
);
