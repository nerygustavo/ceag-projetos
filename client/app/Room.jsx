import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';

import styles from './styles.css';

class Room extends Component {
  static defaultProps = {
    presenca: null,
    name: 'Sala',
  }

  render(){
    const { name, temperatura, umidade, presenca } = this.props;
    const sensor = (presenca !== null);
    const ocupada = (presenca !== null && presenca === 0);
    const gaugeSize = {width: 200, height: 160};
    const labelsStyle = {fontSize: '15px', fill: 'grey'}

    const roomClassName = `${styles.room} ${sensor ? styles.conectada : styles.desconectada} ${ocupada ? styles.ocupada : ''}`

    return (
      <div className={roomClassName}>
        <div className={styles.name}>{name}</div>
        <div className={styles.gauges}>
          <div className={styles.flex1}>
            {temperatura ?
              <Gauge
                value={temperatura}
                {...gaugeSize}
                max={30}
                topLabelStyle={labelsStyle}
                minMaxLabelStyle={labelsStyle}
                label={"Temperatura (˚C)"}
              />
            : null}
          </div>
          <div className={styles.flex1}>
            {umidade ?
              <Gauge
                value={umidade}
                {...gaugeSize}
                color={'#3399ff'}
                topLabelStyle={labelsStyle}
                minMaxLabelStyle={labelsStyle}
                label={"Umidade"}
              />
            : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
