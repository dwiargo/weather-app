import React from 'react';
import { inject, observer } from 'mobx-react';
import './WeatherCard.scss';

@inject('store')
@observer

class WeatherCard extends React.Component{
  render(){
    let { data, store, small } = this.props;
    return(
      <div className={`weather-card ${small ? 'small' : ''}`}>
        <div className="main">
          <i className={`owf owf-${data.cod || data.weather[0].id}`}></i>
          <div className="city-info">
            <div className="temp">{data.main.temp}&deg;</div>
            <div className="headline city">{data.name}</div>
            <div className="date">{store.timestamp}</div>
          </div>
        </div>
        <div className="info">
          <span>{data.weather[0].main}</span>
          <span>{data.main.temp_max}&deg; - {data.main.temp_min}&deg;</span>
        </div>
      </div>
    )
  }
}

export default WeatherCard;