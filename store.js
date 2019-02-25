import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import moment from 'moment';

const isServer = !process.browser
useStaticRendering(isServer)

class Store {
  @observable currentCity = null
  @observable timestamp = moment().format('ll');

  @action setCurrentCity = currentCity => {
    this.currentCity = currentCity;
  }
}

let store = null

export function initializeStore(initialData) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Store(isServer, initialData)
  }
  if (store === null) {
    store = new Store(isServer, initialData)
  }
  return store
}