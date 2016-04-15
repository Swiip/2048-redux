export const START = 'START';
export function start() {
  return {
    type: START
  };
}

export const MOVE = 'MOVE';
export function move(direction) {
  return {
    type: MOVE,
    direction
  };
}

export const ADD_TILE = 'ADD_TILE';
export function addTile(row, column, value) {
  return {
    type: ADD_TILE,
    row, column, value
  };
}

export const UPDATE = 'UPDATE';
export function update() {
  return {
    type: UPDATE
  };
}
