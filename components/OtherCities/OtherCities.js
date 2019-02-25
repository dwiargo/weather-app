import React from 'react';
import WeatherCard from '../WeatherCard';
import './OtherCities.scss';

class OtherCities extends React.Component{
  render(){
    return(
      <div className="other-cities">
        {this.props.items.map((d,i) => (
          <WeatherCard 
            data={d}
            key={`other-data-${i}`}
            small
          />
        ))}
      </div>
    )
  }
}

export default OtherCities;
