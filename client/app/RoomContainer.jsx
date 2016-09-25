import React, { Component } from 'react';
import update from 'react-addons-update';

import styles from './styles.css';
import Room from './Room';

import io from 'socket.io-client';

class RoomContainer extends Component {

  constructor(props){
    super(props);

    this.state = {data: {}}

    const {protocol, hostname, port} = window.location;
    const socketUrl = `${protocol}//${hostname}:${port}`;

    this.socket = io.connect(socketUrl);
    this.socket.on('message', payload => {
      Object.keys(payload).forEach(key => {
        this.setState(update(this.state, {data: {[key] : {$set: payload[key]}} }));
      });
    });
  }

  render(){
    return (
      <div className={styles.body}>
        <div className={styles.rooms}>
          <Room name={"Sala 1"} {...this.state.data}/>
          <Room name={"Sala 2"} />
        </div>
        <div className={styles.rooms}>
          <Room name={"Sala 3"} />
          <Room name={"Sala 4"} />
        </div>
      </div>
    );
  }
}

export default RoomContainer;
