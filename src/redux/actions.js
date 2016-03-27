export const MOVE = 'MOVE';
export function move(direction) {
  return {
    type: MOVE,
    direction
  };
}
