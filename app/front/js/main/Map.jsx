'use strict';

import React from 'react';
import { Map, MapboxLayer, Layer, Marker, Popup } from 'mapbox-react';

class DefaultMap extends React.Component {

  static propTypes = {
    map: React.PropTypes.any,
    socket: React.PropTypes.any
  };

  constructor(props) {
    super(props);
    this.props.socket
      .itemsAsObservable()
      .subscribe(item => {
        item.id = this.state.id++;
        this.setState({
          list: this.state.list.concat(item)
        });
      });
  }

  state = {
    list: [],
    id: 1
  };

  render() {

    let markers = this.state.list.map((item, index) => {
      return <Marker key={item.id} geojson={item.geojson}>
        <div className="marker"></div>
        <Popup>
          <div>{item.data.message}</div>
        </Popup>
      </Marker>;
    });

    return <Map map={this.props.map}>
      <MapboxLayer url="benoitarguel.f1f06bd4"/>
      <Layer>
        {markers}
      </Layer>
    </Map>;
  }

}

export default DefaultMap;