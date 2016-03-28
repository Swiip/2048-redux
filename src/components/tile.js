import React, {Component, PropTypes} from 'react';
import {isNew, hasMoved} from '../game/tile';

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
    return (
      <span className={this.props.tile.classes.join(' ')}
        key={this.props.tile.id}>{this.props.tile.value}</span>
    );
  }
}

TileView.propTypes = {
  tile: PropTypes.object.isRequired
};
