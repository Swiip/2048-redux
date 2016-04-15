import {chooseRandomTile} from '../game/add';

export const ADD_TILE = 'ADD_TILE';
export function addTile(board) {
  const {row, column, value} = chooseRandomTile(board);
  return {
    type: ADD_TILE,
    row, column, value
  };
}

export const MOVE = 'MOVE';
function actionMove(direction) {
  return {
    type: MOVE,
    direction
  };
}

export const UPDATE = 'UPDATE';
function update() {
  return {
    type: UPDATE
  };
}

export const START = 'START';
function actionStart() {
  return {
    type: START
  };
}

export const CONTINUE = 'CONTINUE';
export function actionContinue() {
  return {
    type: CONTINUE
  };
}

export const HAS_WON = 'HAS_WON';
export function hasWon(board) {
  return {
    type: HAS_WON,
    board
  };
}

export const HAS_LOST = 'HAS_LOST';
export function hasLost(board) {
  return {
    type: HAS_LOST,
    board
  };
}

export function move(direction) {
  return (dispatch, getState) => {
    dispatch(actionMove(direction));
    const {board: {board, changed}} = getState();
    if (changed) {
      dispatch(addTile(board));
    }
    dispatch(update());
    dispatch(hasWon(board));
    dispatch(hasLost(board));
  };
}

export function start() {
  return (dispatch, getState) => {
    dispatch(actionStart());
    const {board: {board}} = getState();
    dispatch(addTile(board));
    dispatch(update());
  };
}
