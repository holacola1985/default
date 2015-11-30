'use strict';

import React from 'react';
import { Map as MapComponent, MapboxLayer, Layer, Marker, Popup } from 'mapbox-react';

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
        if (!item.id) {
          item.id = new Date().getTime().toString()
        }
        let key = item.id;
        this.setState({
          list: Object.assign(this.state.list, { [key]: item })
        });
      });
  }

  state = {
    list: {}
  };

  render() {

    let min_size = 7;
    let markers = Object.keys(this.state.list).map((key, index) => {
      let item = this.state.list[key];
      let size = min_size + index;
      let style = {
        height: size,
        width: size,
        borderRadius: size,
        left: -size/ 2,
        top: -size / 2
      };

      return <Marker key={key} geojson={item.geojson}>
        <div className="marker" style={style}></div>
        <div className="animation"></div>
        <Popup offset={[0, 14 - size]}>
          <div>{item.data.message}</div>
        </Popup>
      </Marker>;
    });

    return <MapComponent map={this.props.map}>
      <MapboxLayer url="benoitarguel.f1f06bd4"/>
      <Layer>
        {markers}
      </Layer>
    </MapComponent>;
  }

}

export default DefaultMap;