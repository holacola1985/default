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

    let min_size = 7;
    let markers = this.state.list.map((item, index) => {
      let size = min_size + item.id;
      let style = {
        height: size,
        width: size,
        borderRadius: size,
        left: -size/ 2,
        top: -size / 2
      };

      return <Marker key={item.id} geojson={item.geojson}>
        <div className="marker" style={style}></div>
        <div className="animation"></div>
        <Popup offset={[0, 14 - size]}>
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