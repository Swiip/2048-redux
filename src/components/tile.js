import React, {Component, PropTypes} from 'react';

export class TileView extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.tile !== nextProps.tile) {
      return true;
    }
    if (!nextProps.tile.hasMoved() && !nextProps.tile.isNew()) {
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
    if (tile.isNew()) {
      classArray.push('new');
    }
    if (tile.hasMoved()) {
      classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
      classArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
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
