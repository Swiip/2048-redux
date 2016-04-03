import React, {Component, PropTypes} from 'react';

export class TileView extends Component {
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
