import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '../store'
import { Provider } from 'mobx-react'

class WeatherApp extends App {
  static async getInitialProps(appContext) {
    const mobxStore = initializeStore()
    appContext.ctx.mobxStore = mobxStore

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore
    }
  }

  constructor(props) {
    super(props)
    const isServer = !process.browser;
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default WeatherApp