import _ from 'lodash';

import {size} from './conf';
import {createTile, updateClasses} from './tile';
import {addRandomTile, setPositions} from './move';

export function init() {
  const tiles = [];
  const cells = _.range(size).map(() => _.range(size).map(() => createTile(tiles)));
  tiles.push(..._.flatten(cells));

  addRandomTile(cells, tiles);
  setPositions(cells);
  updateClasses(tiles);

  return {tiles, cells};
}
