import _ from 'lodash';

import {size} from './conf';
import {createTile} from './tile';

export function init() {
  const dimension = _.range(size);
  return dimension.map(() => dimension.map(() => createTile()));
  //   cell: createTile(),
  //   merged: []
  // })));
  // const tiles = _.flatten(cells);
  // const merged = [];

  // return {cells, merged};
}
