import {init} from '../game/init';
import {addRandomTile} from '../game/add';
import {updatePositions, updateClasses} from '../game/tile';
import {clearOldTiles, move} from '../game/move';

function getInitialState() {
  const {tiles, cells} = init();
  return {tiles, cells, changed: false};
}

//////// Reducer ///////////

// START
return getInitialState();

// MOVE
const tiles = clearOldTiles(state.tiles);
const {cells, changed} = move(state.cells, tiles, action.direction);
return {tiles, cells, changed};

// ADD
addRandomTile(state.cells, state.tiles, action.row, action.column, action.value);
const cells = [...state.cells];
return {...state, cells};

// UPDATE
const cells = updatePositions(state.cells);
updateClasses(state.tiles);
return {...state, cells};
