import React, {Component, PropTypes} from 'react';
import {isNew, hasMoved, fromRow, toRow, fromColumn, toColumn} from '../game';

export class TileView extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.tile !== nextProps.tile) {
      return true;
    }
    if (!hasMoved(nextProps.tile) && !isNew(nextProps.tile)) {
      return false;
    }
    return true;
  }

  render() {
    const tile = this.props.tile;
    const classArray = ['tile'];
    classArray.push(`tile${tile.value}`);
    if (!tile.mergedInto) {
      classArray.push(`position_${tile.row}_${tile.column}`);
    }
    if (tile.mergedInto) {
      classArray.push('merged');
    }
    if (isNew(tile)) {
      classArray.push('new');
    }
    if (hasMoved(tile)) {
      classArray.push(`row_from_${fromRow(tile)}_to_${toRow(tile)}`);
      classArray.push(`column_from_${fromColumn(tile)}_to_${toColumn(tile)}`);
      classArray.push('isMoving');
    }
    return (
      <span className={classArray.join(' ')} key={tile.id}>{tile.value}</span>
    );
  }
}

TileView.propTypes = {
  tile: PropTypes.object.isRequired
};
