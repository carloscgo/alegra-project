import consoleLog from '@utils/console-log'
import axios from './axiosConfig'

export const addContact = (name) => {
  try {
    return axios.post('contacts', {
      name
    }).then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}

export const findContact = (query) => {
  try {
    return axios.get('contacts', {
      query
    }).then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}
