import {MOVE, RESTART, CONTINUE} from './actions';
import {init} from '../game/init';
import {clearOldTiles, move} from '../game/move';
import {hasWon, hasLost} from '../game/end';

function getInitialState() {
  const {cells, tiles} = init();

  return {
    cells,
    tiles,
    won: false,
    beyond: false,
    lost: false
  };
}

export function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case MOVE: {
      const tiles = clearOldTiles(state.tiles);
      const cells = move(state.cells, tiles, action.direction);
      const won = hasWon(cells);
      const lost = hasLost(cells);
      const beyond = state.beyond;
      return {tiles, cells, won, lost, beyond};
    }
    case RESTART: {
      return getInitialState();
    }
    case CONTINUE: {
      return {
        tiles: state.tiles,
        cells: state.cells,
        won: state.won,
        lost: state.lost,
        beyond: true
      };
    }
    default: {
      return state;
    }
  }
}
