export const MOVE = 'MOVE';
export function move(direction) {
  return {
    type: MOVE,
    direction
  };
}

export const RESTART = 'RESTART';
export function restart() {
  return {
    type: RESTART
  };
}

export const CONTINUE = 'CONTINUE';
export function actionContinue() {
  return {
    type: CONTINUE
  };
}
