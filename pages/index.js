import React from 'react';
import config from '../config';
import axios from 'axios';
import _ from 'lodash';
import qs from 'query-string';
import Head from 'next/head';
import { OtherCities, WeatherCard, SearchField } from '../components';
import { inject } from 'mobx-react';

@inject('store')

class Home extends React.Component{
  static async getInitialProps({query}){
    let { boundingBoxPad, defaultQuery, baseUrl, boxZoom } = config;
    let res = await axios(`${baseUrl}/weather?${qs.stringify({
      q: query.city || defaultQuery.city,
      appid: config.apiKey,
      units: 'metric'
    })}`);

    let { lon, lat } = res.data.coord;
    let bbox = String(`${lon+boundingBoxPad},${lat+boundingBoxPad},${lon-boundingBoxPad},${lat-boundingBoxPad},${boxZoom}`);
    let resOther = await axios(`${baseUrl}/box/city?bbox=${bbox}&${qs.stringify({
      appid: config.apiKey,
      units: 'metric'
    })}`);
    return{
      data: res.data,
      otherData: resOther.data
    }
  }

  render(){
    return (
      <div>
        <Head>
          <title>My Weather App</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="/static/styles/main.css" rel="stylesheet"/>
          <link href="/static/owfont/css/owfont-regular.css" rel="stylesheet" type="text/css"></link>
        </Head>
        <SearchField/>
        <WeatherCard data={this.props.data}/>
        <OtherCities items={this.props.otherData.list.filter( d => d.name !== this.props.data.name)}/>
      </div>
    )
  }
}

export default Home