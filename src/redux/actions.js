import {chooseRandomTile} from '../game/add';
import {ActionCreators} from 'redux-undo';

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

export const UPDATE_UNDO = 'UPDATE_UNDO';
export function updateUndo(oldBoard) {
  return {
    type: UPDATE_UNDO,
    oldBoard
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
    const {board: {present: {board, changed}}} = getState();
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
    const {board: {present: {board}}} = getState();
    dispatch(addTile(board));
    dispatch(update());
  };
}

export function undo() {
  return (dispatch, getState) => {
    const {board: {present: {board, changed}}} = getState();
    dispatch(ActionCreators.undo()); // Undo udate
    if (changed) {
      dispatch(ActionCreators.undo()); // Undo addTile
    }
    dispatch(ActionCreators.undo()); // Undo move
    dispatch(updateUndo(board));
  }
}
