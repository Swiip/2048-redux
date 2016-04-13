import _ from 'lodash';

import {size} from './conf';
import {createTile} from './tile';

export function init() {
  return _.range(size).map(() => _.range(size).map(() => ({
    cell: createTile(),
    merged: []
  })));
  // const tiles = _.flatten(cells);
  // const merged = [];

  // return {cells, merged};
}
