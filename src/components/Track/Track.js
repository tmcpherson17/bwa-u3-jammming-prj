import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.onAdd) {
      return <a className="track action" onClick=(this.addTrack)>+</a>
    } else {
      return <a className="track action" onClick=(this.removeTrack)>-</a>
    }
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3><!-- track name will go here --></h3>
          <p><!-- track artist will go here--> | <!-- track album will go here --></p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
