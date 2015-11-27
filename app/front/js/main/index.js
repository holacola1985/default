'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import L from 'mapbox.js';
import config from '../../../../config/public.json';
import Map from './Map.jsx';
import {MapboxObservableSocket} from 'lightstream-socket';

L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';

(function(config) {

  const options = {
    retry_interval: 5000
  };
  const socket = new MapboxObservableSocket('ws://' +  config.hostname + '/socket/', 'item', options);

  let map = L.map('map')
    .setView([0, 0], 2);

  const element = React.createElement(Map, {
    socket: socket,
    map: map
  });

  ReactDOM.render(element, document.getElementById('map-component'));

  socket.on('opened', function () {
    socket.attachMap(map);
  });

  socket.on('error', function (error) {
    console.log('error in socket', error);
  });

  socket.on('closed', function () {
    console.log('socket has been closed');
  });

  socket.connect();

})(config);
