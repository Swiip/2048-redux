import _ from 'lodash';

import {size} from './conf';
import {createTile} from './tile';

export function init() {
  const tiles = [];
  const cells = _.range(size).map(() => _.range(size).map(() => createTile(tiles)));
  tiles.push(..._.flatten(cells));

  return {tiles, cells};
}
